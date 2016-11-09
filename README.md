# angular-cli-env
[![npm version](https://badge.fury.io/js/angular-cli-env.svg)](https://badge.fury.io/js/angular-cli-env)

Angular CLI Env Addon

Inspired by [Twelve-Factor App](https://12factor.net/config)

This addon can generate a constant file from `env.json` so that your environment variable is scalable. For now it only supports generating TypeScript constant exporting file.

For more [details](https://github.com/antonybudianto/angular-cli-env/wiki/About)

## Pasos seguidos para customizar el addon llamado angular-cli-env para que use blueprints

(hacer uso del "hook" blueprintsPath, extender el objeto de configuracion del comando a EmberGenerateCommand.extend
y copiar las blueprints al sitio elegido)

0. Tener la última version de angular-cli funcionado.
1. Descargarse el paquete *npm i angular-cli-env* en ella.
2. Ir al código del módulo recien descargado: *cd node_modules/angular-cli-env*
3. En *node_modules/angular-cli-env/index* añadir la propiedad *blueprintsPath* de la siguiente manera:

```
blueprintsPath: function () {
  return path.join(__dirname, './lib/blueprints');
}
```

4. Modificar comando *ng env:init* en *node_modules/angular-cli-env/lib/commands/env-init.js*, extender el 
objeto que exporta con EmberGenerateCommand.extend, por ejemplo quedaría asi:

```
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

```
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

7. Copiar los blueprints a node_modules/angular-cli-env/lib/blueprints. Dentro del paquete de angular-cli
en *node_modules/angular_cli/blueprints* hay ejemplos. Yo me he basado en el código de *component*.

8. Copiar las utilidades que usa angular-cli al usar comandos de *node_modules/angular_cli/utilities*
a *node_modules/angular-cli-env/lib/utilities* para que no haya problemas con las utilidades que necesitan los blueprints copiados
y poder seguir adelante. Luego se decidira si nos sirven o no.

Comando: ng env:init env friend
## Prerequisites

This addon has the following prerequisites:

- Node.js 4.x
- Angular project created via [angular-cli](https://github.com/angular/angular-cli)

## Installation & Setup

Run this inside your Angular CLI project:

```sh
npm install --save-dev angular-cli-env
```

## Usage

### Initialize

First, you need to initialize things needed for env generation by running:

```sh
ng env:init
```

It'll generate 2 files:
- `env.json` (Your environment variables live here, can be **git-ignored** as you like )
- `src/app/shared/app-env.interface.ts` (Your environment variable interface for static type, must be checked to source control)

You only need to this **once**.

### Generate

Next, you can generate the constant file by running:

```sh
ng env
```

It'll generate the constant file at `src/app/shared/env.ts`, and this file can be **git-ignored** as you like.

By default, it will generate a constant file with static type `AppEnv`.
If you prefer to use dynamic type, you can add `--typeless` flag when generating.

You can also custom the path and name using `--path` and `--name` flags.

> When changing path, you need to adjust your app interface's path accordingly

### Access the env in code

Just import the generated file in your app, for example:
```ts
import { Component } from '@angular/core';
import { ENV } from './shared/env';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor() {
    console.log(ENV.TITLE);
  }
}

```

## Authors

- [Antony Budianto](http://twitter.com/antonybudianto)
- Based on [angular-cli-github-pages](https://github.com/IgorMinar/angular-cli-github-pages)

## License

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
