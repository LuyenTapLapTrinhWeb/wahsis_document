let templateUrl = "toys/toys.template.html"
let toys = {
    templateUrl: templateUrl,
    controller: toysController
}
angular.module("toyList").component("toyList", toys)