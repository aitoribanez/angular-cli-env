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
4. Copiar los blueprints a node_modules/angular-cli-env/lib/blueprints. Dentro del paquete de angular-cli
en *node_modules/angular_cli/blueprints* hay ejemplos. Yo me he basado en el código de *component*.

(5. Copiar las utilidades que usa angular-cli al usar comandos de *node_modules/angular_cli/utilities*
a *node_modules/angular-cli-env/lib/utilities* para que no errores y poder seguir adelante. Luego se
decidira si nos sirven o no.)

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
