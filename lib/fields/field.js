"use strict";
var StringField = require('./stringField');
var Field = (function () {
    function Field() {
    }
    Field.prototype.makeFieldsObject = function (fields, entityName, entityNameCapitalize) {
        var resp = '';
        // let x = 0;
        var serverFields = [];
        var stringField = StringField.StringField.prototype;
        if (Object.keys(fields).length > 0) {
            for (var key in fields) {
                switch (fields[key]['type']) {
                    case 'string':
                        resp += stringField.template(entityName, entityNameCapitalize, fields[key]);
                        serverFields[key] = 'faker.name.findName()';
                        break;
                    case 'number':
                        serverFields[key] = 'Math.floor((Math.random() * 12) + 1)';
                        break;
                    case 'uuid':
                        serverFields[key] = 'uuid.v4()';
                        break;
                    case 'file':
                        serverFields[key] = '"img/" + i + ".jpg"';
                        break;
                }
            }
        }
        return serverFields;
    };
    return Field;
}());
exports.Field = Field;
