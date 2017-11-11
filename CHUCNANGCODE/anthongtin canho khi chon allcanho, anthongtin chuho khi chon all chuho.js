/**FIX CAI BUG ANTHONGTIN CANHO KHI CHON ALL CAN HO, ANTHONGTIN CHUHO KHI CHON ALL CANHO */
$scope.ngChangeThongtinroom = room_id => {
    if (room_id !== null && room_id !== "" && room_id !== undefined) {
      //danh sach thong tin chu ho
      var rooms = { room_id: room_id };
      var company = { company_id: "40743" };
      $scope.json_chuho = JSON.stringify({
        rooms: rooms,
        company: company //company_id:"40743"
      });

      UtilityService.getListObjectWithParam(
        "owners",
        "list_owners_by_room_id",
        $scope.json_chuho
      ).success(function (response) {
        // console.log(response, $scope.json_room)
        if (response.err === 0) {
          $scope.owners_list = response.dt.owners_list;
        }
      });
      // thong tin can ho
      if ($scope.rooms_list.length > 0) {
        for (var i = 0; i < $scope.rooms_list.length; i++) {
          if ($scope.it.room_id === $scope.rooms_list[i].room_id) {
            $scope.it.acreage = $scope.rooms_list[i].acreage;
            $scope.it.direction_name = $scope.rooms_list[i].direction_name;
            $scope.it.view_id = $scope.rooms_list[i].view_id;
            $scope.it.view_name = $scope.rooms_list[i].view_name;
            $scope.it.room_name = $scope.rooms_list[i].name;
            $scope.it.room_type_id = $scope.rooms_list[i].room_type_id;
            $scope.it.location_id = $scope.rooms_list[i].location_id;
          }
        }
      }
    }else{
      //xoa thong tin can ho khi chon all can ho
      $scope.it.acreage = 0;
      $scope.it.direction_name = "";
      $scope.it.view_id = "";
      $scope.it.view_name = "";
      $scope.it.room_name ="";
      $scope.it.room_type_id = 0;
      $scope.it.location_id = 0;
    }
  }; //end function ngchange
  $scope.ngChangeThongtinchuho = owner_id => {
    if (owner_id !== null && owner_id !== "" && owner_id !== undefined) {
      if ($scope.owners_list.length > 0) {
        for (var i = 0; i < $scope.owners_list.length; i++) {
          if (owner_id === $scope.owners_list[i].owner_id) {
            $scope.it.owner_name = $scope.owners_list[i].owner_name;
            $scope.it.cell_phone = $scope.owners_list[i].phone;
            $scope.it.email_address = $scope.owners_list[i].email;
            $scope.it.contact_name = $scope.owners_list[i].owner_name;
            $scope.it.contact_phone = $scope.owners_list[i].phone;
            $scope.it.contact_email = $scope.owners_list[i].email;
          }
        }
      }
    } else {
      //xoa thong tin chu ho khi chon all chu ho
      $scope.it.owner_name = "";
      $scope.it.cell_phone = "";
      $scope.it.email_address = "";
      $scope.it.contact_name = "";
      $scope.it.contact_phone = "";
      $scope.it.contact_email = "";
    }
  };