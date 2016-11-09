/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-env',

  blueprintsPath: function () {
    return path.join(__dirname, './lib/blueprints');
  },

  includedCommands: function() {
    return {
      'env:init': require('./lib/commands/env-init'),
      'env': require('./lib/commands/env')
    };
  }
};
