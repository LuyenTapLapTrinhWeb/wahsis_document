"use strict"
function Person() {
    var _firstName = "unknown";
    Object.defineProperties(this, {
        "FirstName": {
            set: function (firstName) { _firstName = firstName },
            get: function () { return _firstName; }
        }
    });
}
var person = new Person();
person.FirstName = "alibaba";
var firstName = person.FirstName;
alert(firstName);