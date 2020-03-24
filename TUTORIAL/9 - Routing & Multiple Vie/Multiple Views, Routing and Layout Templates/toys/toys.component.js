toysListTemplateUrl = "toys/toys.template.html"
let toysListComponent = {
    templateUrl: toysListTemplateUrl,
    controller: ['$http', toysListController]
}
angular.module('toysList').component("toysList", toysListComponent)