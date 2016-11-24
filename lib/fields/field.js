"use strict";
var StringField = require('./stringField');
var Field = (function () {
    function Field() {
    }
    // Getting entitys fields configuration, entity name and entity namecapitalize
    // return an array having as key the field name and value as nodejs function
    // that copies their content directy to server.js file.
    // Object -> array -> string
    Field.prototype.stringify = function (fields, entityName, entityNameCapitalize) {
        var object = this._makeFieldsObject(fields, entityName, entityNameCapitalize);
        return this._serverFieldStringify(object);
    };
    // Object -> array
    Field.prototype._makeFieldsObject = function (fields, entityName, entityNameCapitalize) {
        var resp = '';
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
        // return this._serverFieldStringify(serverFields);
        return serverFields;
    };
    // array -> string
    // Getting the array result of _makeFieldsObject
    // returns a string
    Field.prototype._serverFieldStringify = function (serverFields) {
        var resp = '';
        if (Object.keys(serverFields).length > 0) {
            resp = '{\n';
            for (var key in serverFields) {
                resp += "\t" + key + " : " + serverFields[key] + ",\n";
            }
            resp = resp.slice(0, -2);
            resp += '\n}';
            return resp;
        }
    };
    return Field;
}());
exports.Field = Field;
