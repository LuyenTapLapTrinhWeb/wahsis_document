https://www.w3resource.com/javascript/form/ip-address-validation.php

function ValidateIPaddress(inputText) {
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (inputText.match(ipformat)) {
        return true;
    }
    else {
        swal($filter("translate")("warning"), $filter("translate")("IP_ADDRESS_REQUIRED_FORMAT"), "warning");
        return false;
    }
}
$scope.ngBlurValidateIPaddress = function (inputText) {
    if (ValidateIPaddress(inputText)) {
        $scope.it.ip_address = $scope.it.ip_address;
    } else {
        $scope.it.ip_address = "";
    }
}
$scope.kiemtranhaptruockhiluu = function () {
    if (!$scope.it.ip_address) {
        swal($filter("translate")("warning"), $filter("translate")("IP_ADDRESS_REQUIRED"), "warning");
        return false;
    } else if (!$rootScope.device_image) {
        swal($filter("translate")("warning"), $filter("translate")("IP_ADDRESS_REQUIRED"), "warning");
        return false;
    } else {
        return true;
    }
}
$scope.ok = function (save_type) {
    if ($scope.kiemtranhaptruockhiluu()) {

    }
}
<div class="col-md-6">
    <label>{{"IP_ADDRESS"|translate}}<span class="c-red">*</span></label>
    <input type="text" autofocus class="form-control" ng-blur="ngBlurValidateIPaddress(it.ip_address)"
        ng-model="it.ip_address" required="true">
</div>