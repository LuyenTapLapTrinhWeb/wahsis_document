`how to organize your application and presentation logic into isolated, reusable components`
    /* structure folder */
    `app
    HelloComponent
        hello.component.js
    index.html`
/* app.js */
'use strict';
// Define the `phonecatApp` module
angular.module('phonecatApp', []);

/* hello.component.js */
angular.
    module('phonecatApp').
    component('greetUser', {
        template: 'Hello, {{$ctrl.user}}!',
        controller: function GreetUserController() {
            this.user = 'world';
        }
    });
/* index.html */
`<head> <script src="HelloComponent/hello.component.js"></script> </head>`
    /* The following line is how to use the "greetUser" component above in your html doc. */
    `<body> <greet-user></greet-user> </body>`