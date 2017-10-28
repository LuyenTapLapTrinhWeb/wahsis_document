$scope.change_room = function () {
        $scope.room_list = "";

        if ($scope.room_list === undefined || $scope.room_list === "" || $scope.room_list === null)
        {

            $scope.get_list_total_payment($scope.selected_room1);

        }
        
        $scope.room_listtemp = [];
        $scope.room_list = [];
       
        for (var i = 0; i < $scope.room_hienthi.length; i++) {
            if ($scope.room_hienthi[i].room_id === $scope.selected_room1) {
                $scope.room_listtemp.room_id = $scope.selected_room1;
                $scope.room_listtemp.room_name = $scope.room_hienthi[i].name;
                $scope.room_listtemp.room_type_id = $scope.room_hienthi[i].room_type_id;

                $scope.str_search1 = {room_id: $scope.selected_room1}
                $scope.page_room = {page_size: 10000000, page_index: 1}
                var jsonRoom = JSON.stringify({rooms: JSON.parse(JSON.stringify($scope.str_search1)), company: JSON.parse(JSON.stringify($scope.company)), languages: JSON.parse(JSON.stringify($scope.languageTemp)), page: JSON.parse(JSON.stringify($scope.page_room))});

                UtilityService.getListObjectWithParam("rooms", 'search', jsonRoom).success(function (response) {
                    console.log(response)
                    if (response.err === 0) {
                        $scope.room_one = response.dt.rooms_list;
                        console.log($scope.room_one)

                        $scope.room_listtemp.room_type_name = $scope.room_one[0].room_type_name;
                        $scope.room_listtemp.floor_id = $scope.room_one[0].floor_id;
                        $scope.room_listtemp.floor_name = $scope.room_one[0].floor_name;
                        $scope.room_listtemp.block_id = $scope.room_one[0].block_id;
                        $scope.room_listtemp.block_name = $scope.room_one[0].block_name;
                        $scope.room_listtemp.is_check = true;
                        $scope.room_list.push($scope.room_listtemp);
                         $scope.flag_check_all = true;
                        console.log($scope.room_list);



                    }
                });


            }
        }
        $scope.apartment_fee_totals_list = [];
    }
$scope.list_room_temp = list_room_id.split(',')
                    for (var i = 0; i < $scope.room_list.length; i++)
                    {
                        for (var j = 0; j < $scope.list_room_temp.length; j++)
                        {
                            if (parseInt($scope.room_list[i].room_id) === parseInt($scope.list_room_temp[j]))
                                $scope.pdf_list.push($scope.room_list[i])
                        }
                    }