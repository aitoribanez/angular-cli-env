const StringField = require('./stringField');

export class Field {
  makeFieldsObject(fields, entityName, entityNameCapitalize) {
    let resp = '';
    // let x = 0;
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
    return serverFields;
  }
}
