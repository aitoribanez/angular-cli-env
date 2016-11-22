import { FieldI } from './fieldI';

export class StringField implements FieldI {
  constructor(
    public id: string,
    public name: string,
    public createdAt: Date,
    public updatedAt: Date) { }

   template() {
    return 'template';
  }
}
