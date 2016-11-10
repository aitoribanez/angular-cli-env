'use strict';

var fs = require('fs');
var EmberGenerateCommand = require('ember-cli/lib/commands/generate');
var path = require('path');
var Blueprint = require('ember-cli/lib/models/blueprint');
var SilentError = require('silent-error');

module.exports = EmberGenerateCommand.extend({
  name: 'generate:entity',
  aliases: ['generate:entity'],
  description: 'Generate CRUD for entity on backend and frontend',
  works: 'insideProject',

  availableOptions: [],

  beforeRun: function (rawArgs) {
    if (!rawArgs.length) {
      return;
    }

    if (rawArgs[0] !== '--help' &&
      !fs.existsSync(path.join(__dirname, '..', 'blueprints', rawArgs[0]))) {
      SilentError.debugOrThrow('angular-cli-generate-entity/commands/entity', "Invalid blueprint: " + rawArgs[0]);
    }
    
    if (!rawArgs[1]) {
      SilentError.debugOrThrow('angular-cli-generate-entity/commands/entity', "The `ng generate:entity " + rawArgs[0] + "` command requires a entity name to be specified.");
    }
  }
});
