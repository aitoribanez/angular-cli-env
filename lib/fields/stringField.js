'use strict';

module.exports = {
  id: 0,
  name: 'name',
  createdAt: 'a',
  updatedAt: 'b',
  template: function () {
    console.log("template on string field module");
    return 'template';
  }
};
