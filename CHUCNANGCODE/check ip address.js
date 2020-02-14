/* open popup HTMl copy vo field*/
`<div class="col-md-6">
/* copy label va input */
    <label>{{"IP_ADDRESS"| translate }}<span class="c-red">*</span></label>
    <input type="text" autofocus class="form-control" ng-blur="ngBlurValidateIPaddress(it.ip_address)"
        ng-model="it.ip_address" required="true">
 </div>`
/* co trong utility */
function ValidateIPaddress(inputText) {
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (inputText.match(ipformat)) {
        return true;
    } else {
        return false;
    }
}
/* goi ham validate trong utility | copy vao controller */
$scope.ngBlurValidateIPaddress = function (inputText) {
    if (utility.ValidateIPaddress(inputText)) {
        $scope.it.ip_address = $scope.it.ip_address;
    } else {
        swal($filter("translate")("warning"), $filter("translate")("IP_ADDRESS_REQUIRED_FORMAT"), "warning");
        $scope.it.ip_address = "";
    }
}