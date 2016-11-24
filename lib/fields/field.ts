const StringField = require('./stringField');

export class Field {
  // Object -> array -> string
  stringify(fields, entityName, entityNameCapitalize) {
    let object = this._makeFieldsObject(fields, entityName, entityNameCapitalize);
    return this._serverFieldStringify(object);
  }

  // Object -> array
  // Getting entitys fields configuration, entity name and entity namecapitalize
  // return an array having as key the field name and value as nodejs function
  // that copies their content directy to server.js file.
  private _makeFieldsObject(fields, entityName, entityNameCapitalize) {
    let resp = '';
    let serverFields = [];
    let stringField = StringField.StringField.prototype;

    if (Object.keys(fields).length > 0) {
      for (let key in fields) {
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
          /* default:
          default code block */
        }
      }
    }
    // return this._serverFieldStringify(serverFields);
    return serverFields;
  }

  // array -> string
  // Getting the array result of _makeFieldsObject
  // returns a string
  private _serverFieldStringify(serverFields) {
    let resp = '';
    if (Object.keys(serverFields).length > 0) {
      resp = '{\n';
      for (let key in serverFields) {
        resp += `\t${key} : ${serverFields[key]},\n`
      }
      resp = resp.slice(0, -2);
      resp += '\n}';

      return resp;
    }
  }
}
