HI Thanh,
Em kiểm tra tính năng thiết lập rèm. Vui lòng tìm kiếm hình ảnh default cho rèm.

var pattern_image_list = [
    // {name: $filter('translate')('LIGHT'), value: "light.jpg"},
    // {name: $filter('translate')('FAN'), value: "fan.jpg"},
    // {name: $filter('translate')('AIR_CONDITIONER'), value: "air_conditioner.jpg"},
    // {name: $filter('translate')('REFRIGERATOR'), value: "refrigerator.jpg"},
    // {name: "Tivi", value: "tivi.jpg"},
    // {name: $filter('translate')('WASHING_MACHINE'), value: "washing_machine.jpg"}
    
]
$scope.upload_text = $filter('translate')('UPLOAD')
$scope.pattern_image_list = []
for (var i = 1; i <= 18; i++) {
    $scope.pattern_image_list.push({ name: $filter('translate')('DEVICE_AIRCONDITIONER') + " " + i, value: i + ".png" });
}
 
$scope.change_pattern_image = function () {
    if ($scope.it.pattern_image === "" || $scope.it.pattern_image === undefined || $scope.it.pattern_image === null) {
        $rootScope.device_image = "assets/img/no_imagesmall.jpg"
    } else {
        $rootScope.device_image = "img/device_airconditioner/" + $scope.it.pattern_image;
        device_image = $rootScope.device_image
        $scope.item.logo_path = $rootScope.device_image
    }
    console.log($rootScope.device_image)
}