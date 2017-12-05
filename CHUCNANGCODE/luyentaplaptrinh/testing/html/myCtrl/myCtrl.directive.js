function myCtrlDirective() {
  return {
    // template: "<h1>Made by a directive!</h1>"
    restrict: "E",
    // replace: true,
    templateUrl: "../myCtrl/myCtrl.view.html"
  };
}
