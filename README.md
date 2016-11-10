# angular-cli-generate-entity
[![npm version](https://badge.fury.io/js/angular-cli-env.svg)](https://badge.fury.io/js/angular-cli-env)

## Prerequisites

This addon has the following prerequisites:

- Node.js 4.x
- Angular project created via [angular-cli](https://github.com/angular/angular-cli)

## Installation & Setup

Run this inside your Angular CLI project:

```sh
npm install aitoribanez/angular-cli-generate-entity --save-dev
```
## Usage

### Generate

```sh
ng generate entity [entityName]
```

It'll generate 4 files:
- `__name__.component.css`
- `__name__.component.html`
- `__name__.component.spec.ts`
- `__name__.component.ts`

You only need to this **once**.

## Miscelania

### Pasos seguidos para customizar el addon llamado angular-cli-env para que use blueprints

(hacer uso del "hook" blueprintsPath, extender el objeto de configuracion del comando a EmberGenerateCommand.extend
y copiar las blueprints al sitio elegido)

0. Tener la última version de angular-cli funcionado.
1. Descargarse el paquete *npm i angular-cli-env* en ella.
2. Ir al código del módulo recien descargado: *cd node_modules/angular-cli-env*
3. En *node_modules/angular-cli-env/index* añadir la propiedad *blueprintsPath* de la siguiente manera:

```js
blueprintsPath: function () {
  return path.join(__dirname, './lib/blueprints');
}
```

4. Modificar comando *ng env:init* en *node_modules/angular-cli-env/lib/commands/env-init.js*, extender el 
objeto que exporta con EmberGenerateCommand.extend, por ejemplo quedaría asi:

```js
var EmberGenerateCommand = require('ember-cli/lib/commands/generate');

module.exports = EmberGenerateCommand.extend({
  name: 'env:init',
  aliases: ['env:init'],
  description: 'Initialize env templates',
  works: 'insideProject',

  availableOptions: []
})
```

5. En *node_modules/angular-cli-env/index.js* añadir *var path = require('path');*

6. Añadir en *node_modules/angular-cli-env/lib/blueprints/index.js* despues del método **, lo siguiente:

```js
beforeRun: function (rawArgs) {
    if (!rawArgs.length) {
      return;
    }
    // map the blueprint name to allow for aliases
    // rawArgs[0] = mapBlueprintName(rawArgs[0]);

    if (rawArgs[0] !== '--help' &&
      !fs.existsSync(path.join(__dirname, '..', 'blueprints', rawArgs[0]))) {
      SilentError.debugOrThrow('angular-cli/commands/generate', "Invalid blueprint: " + rawArgs[0]);
    }
    if (!rawArgs[1]) {
      SilentError.debugOrThrow('angular-cli/commands/generate', "The `ng generate " + rawArgs[0] + "` command requires a name to be specified.");
    }
    // Override default help to hide ember blueprints
    EmberGenerateCommand.prototype.printDetailedHelp = function () {
      console.log("a")
      var blueprintList = fs.readdirSync(path.join(__dirname, '..', 'blueprints'));
      var blueprints = blueprintList
        .filter(function (bp) { return bp.indexOf('-test') === -1; })
        .filter(function (bp) { return bp !== 'ng2'; })
        .filter(function (bp) { return bp !== 'mobile'; })
        .map(function (bp) { return Blueprint.load(path.join(__dirname, '..', 'blueprints', bp)); });
      var output = '';
      blueprints
        .forEach(function (bp) {
          console.log("bp", bp)
          output += bp.printBasicHelp(false) + os.EOL;
        });
      this.ui.writeLine(chalk.cyan('  Available blueprints'));
      this.ui.writeLine(output);
    };
    EmberGenerateCommand.prototype.beforeRun.apply(this, arguments)

    return EmberGenerateCommand.prototype.beforeRun.apply(this, arguments);
  },
```

7. Añadir los imports al mismo fichero, *node_modules/angular-cli-env/lib/blueprints/index.js*:

```js
var EmberGenerateCommand = require('ember-cli/lib/commands/generate');
var path = require('path');
var Blueprint = require('ember-cli/lib/models/blueprint');
var SilentError = require('silent-error');
```

8. Para finalizar con los cambios en este fichero, comentar el metodo run.

9. Copiar los blueprints a node_modules/angular-cli-env/lib/blueprints. Dentro del paquete de angular-cli
en *node_modules/angular_cli/blueprints* hay ejemplos. Yo me he basado en el código de *component*.

10. Copiar las utilidades que usa angular-cli al usar comandos de *node_modules/angular_cli/utilities*
a *node_modules/angular-cli-env/lib/utilities* para que no haya problemas con las utilidades que necesitan los blueprints copiados
y poder seguir adelante. Luego se decidira si nos sirven o no.

## Authors

- [Aitor Ibañez](http://twitter.com/aitoribanez_)
- Based on [angular-cli-env](https://github.com/antonybudianto/angular-cli-env)

## License

[Licensed under the GPLv3 license](http://www.gnu.org/licenses/gpl-3.0.txt)
