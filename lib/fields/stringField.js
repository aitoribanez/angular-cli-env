"use strict";
var StringField = (function () {
    function StringField(id, name, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    StringField.prototype.template = function () {
        return 'template';
    };
    return StringField;
}());
exports.StringField = StringField;
