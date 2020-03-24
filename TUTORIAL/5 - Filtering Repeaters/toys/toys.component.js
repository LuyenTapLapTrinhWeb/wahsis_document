toysListTemplateUrl = "toys/toys.template.html"
let toysListComponent = {
    templateUrl: toysListTemplateUrl,
    controller: toysListController
}
angular.module('toysList').component("toysList", toysListComponent)