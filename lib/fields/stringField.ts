import { FieldI } from './fieldI';

export class StringField implements FieldI {
  constructor(
    public id: string,
    public name: string,
    public createdAt: Date,
    public updatedAt: Date) { }

  template(entityName, entityNameCapitalize, field) {
    let args = '';
    delete field.type;
    // console.log('arguments', Object.keys(field).length);
    if (Object.keys(field).length > 0) {
      // console.log('IF');
      args = ' ';
      for (let key in field) {
        if (field.hasOwnProperty(key)) {
          args += `${key}="${field[key]}" `;
        }
      }
      args = args.slice(0, -1);
    }

    return `<div>
      <label>${entityNameCapitalize}</label>
      <input type="text" name="${entityName}"${args}>
    </div>
    `;
  }
}


