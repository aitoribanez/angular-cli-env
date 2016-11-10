'use strict';

var fs = require('fs');
// var _ = require('lodash');
var EmberGenerateCommand = require('ember-cli/lib/commands/generate');
var path = require('path');
var Blueprint = require('ember-cli/lib/models/blueprint');
var SilentError = require('silent-error');

module.exports = EmberGenerateCommand.extend({
  name: 'generate',
  aliases: ['generate'],
  description: 'Generate CRUD for entity on backend and frontend',
  works: 'insideProject',

  availableOptions: [],

  beforeRun: function (rawArgs) {
    if (!rawArgs.length) {
      return;
    }

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
  }
});
