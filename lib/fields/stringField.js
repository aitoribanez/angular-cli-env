"use strict";
var StringField = (function () {
    function StringField(id, name, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    StringField.prototype.template = function (entityName, entityNameCapitalize, field) {
        var args = '';
        delete field.type;
        // console.log('arguments', Object.keys(field).length);
        if (Object.keys(field).length > 0) {
            // console.log('IF');
            args = ' ';
            for (var key in field) {
                if (field.hasOwnProperty(key)) {
                    args += key + "=\"" + field[key] + "\" ";
                }
            }
            args = args.slice(0, -1);
        }
        return "<div>\n      <label>" + entityNameCapitalize + "</label>\n      <input type=\"text\" name=\"" + entityName + "\"" + args + ">\n    </div>\n    ";
    };
    return StringField;
}());
exports.StringField = StringField;
