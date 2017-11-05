    /**
     * search.loaicanho roomTypeList loai can ho
     * http://pms-dev.wahsis.net/api/room_types?cm=list&dt={"company":{"company_id":40743},"languages":{"language_id":"vi"}}
     */ 
    var dt = JSON.stringify(
      {
        company: $scope.company,
        languages: { language_id: $scope.language }
      }
    );
    UtilityService.getListObjectWithParam(
      "room_types",
      "list",
      dt
    ).then(function(response) {
      $scope.room_types_list = response.data.dt.room_types_list;
    });


    /**search.canho search.room */
    $scope.json_rooms = JSON.stringify({
      company: $scope.company, //company_id:"40743"
      languages: $scope.languageTemp //language_id:"vi"
    });
    UtilityService.getListObjectWithParam(
      "rooms",
      "list",
      $scope.json_rooms
    ).success(function(response) {
      // console.log(response, $scope.json_room)
      if (response.err === 0) {
        $scope.rooms_list = response.dt.rooms_list;
      }
    });