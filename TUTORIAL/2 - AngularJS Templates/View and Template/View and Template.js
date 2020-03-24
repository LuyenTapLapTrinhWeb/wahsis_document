bootstraping = {
    template: [
        {
            id: 1,
            directive: "ng-repeat",
            expression: `{{phone.name}}`,
        },
        {
            id: 2,
            directive: "ng-repeat",
            expression: `{{phone.snippet}}`,
        },
        {
            id: 3,
            directive: "ng-controller",
            expression: `{{phone.name}}`,
            expression: `{{phone.snippet}}`,
        },
        {
            id: 4,
            directive: "ng-app",
            module: "phonecatApp",
            controller: "PhoneListController",
        },
    ],
    model: []
}
/* chu y: $rootScope trong ng-app */