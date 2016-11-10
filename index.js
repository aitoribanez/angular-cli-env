/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'angular-cli-generate-entity',

  blueprintsPath: function () {
    return path.join(__dirname, './lib/blueprints');
  },

  includedCommands: function () {
    return {
      'generate:entity': require('./lib/commands/entity')
    };
  }
};
