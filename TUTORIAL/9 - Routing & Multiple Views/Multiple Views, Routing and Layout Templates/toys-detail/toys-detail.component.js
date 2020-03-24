toysDetailTemplateUrl = "toys-detail/toys-detail.template.html"
let toysDetailComponent = {
    templateUrl: toysDetailTemplateUrl,
    controller: ['$routeParams', toysDetailController]
}
angular.module('toysDetail').component("toysDetail", toysDetailComponent)