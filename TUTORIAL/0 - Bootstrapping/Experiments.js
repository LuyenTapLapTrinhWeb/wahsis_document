bootstraping = {
    template: [
        {
            id: 1,
            directive: "ng-app",
            binding: "{{}}",
            expression: `1+1`,
            result: "{{1+1}}"
        },
        {
            id: 2,
            directive: "ng-app",
            binding: "{{}}",
            expression: `2+1`,
            result: "{{2+1}}"
        }
    ],
    model: []
}
/* chu y: $rootScope trong ng-app */