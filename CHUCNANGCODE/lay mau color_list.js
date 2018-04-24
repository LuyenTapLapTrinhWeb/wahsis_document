$http.get(API_URL + "color_status?cm=list&dt={company:{company_id:" + com_id + "},languages:{language_id:" + language + "}}").success(function (response) {
    if (response.err === 0) {
        $scope.color_list = response.dt.color_status_list;
        for (var i = $scope.color_list.length - 1; i >= 0; i--) {
            if ($scope.color_list[i].color_code !== "available" &&
                $scope.color_list[i].color_code !== "contract" &&
                $scope.color_list[i].color_code !== "reservation" &&
                $scope.color_list[i].color_code !== "lock" &&
                $scope.color_list[i].color_code !== "deposit") {
                $scope.color_list.splice(i, 1);
            }
        }
        var temp_color_list = [];
        temp_color_list.push($scope.get_Color("lock", $scope.location_list1[0].lock));
        temp_color_list.push($scope.get_Color("available", $scope.location_list1[0].available));
        temp_color_list.push($scope.get_Color("reservation", $scope.location_list1[0].reservation));
        temp_color_list.push($scope.get_Color("deposit", $scope.location_list1[0].deposit));
        temp_color_list.push($scope.get_Color("contract", $scope.location_list1[0].contract));

        $scope.color_list = [];
        $scope.color_list = temp_color_list;

    }
    if (response.err === 403) {
        $rootScope.logout();
    }

});
