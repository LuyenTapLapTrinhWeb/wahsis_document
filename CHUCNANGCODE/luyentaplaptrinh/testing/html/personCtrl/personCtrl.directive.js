function personalDirective() {
  return {
    // template: "<h1>Made by a directive!</h1>"
    restrict: "E",
    // replace: true,
    templateUrl: "../personCtrl/personCtrl.view.html"
  };
}
