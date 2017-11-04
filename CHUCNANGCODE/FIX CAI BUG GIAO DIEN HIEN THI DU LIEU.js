 /**FIX CAI BUG GIAO DIEN HIEN THI DU LIEU */
  if (item.room_posted_for_sale_id === 0) {
    $scope.it.status = $scope.status_list[1].value; //id = 1 "dang ban" -0> default status =1
    $scope.it.total_amount = 0; //default total-amount =0
  } else {
    //hien thong tin status edit
    if ($scope.status_list.length > 0) {
      for (var i = 0; i < $scope.status_list.length; i++) {
        if ($scope.status_list[i].name === item.status) {
          $scope.it.status = $scope.status_list[i].value;
        }
      }
    }
    //hienthithongtincanho
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
        if ($scope.rooms_list.length > 0) {
          for (var i = 0; i < $scope.rooms_list.length; i++) {
            if ($scope.rooms_list[i].room_id === $scope.it.room_id) {
              $scope.it.view_name = $scope.rooms_list[i].view_name;
              $scope.it.direction_name = $scope.rooms_list[i].direction_name;
              // direction_name
            }
          }
        }
      }
    });
    //hienthongtinchuho
    var rooms = { room_id: $scope.it.room_id };
    var company = { company_id: "40743" };
    var owners_list = [];
    $scope.json_chuho = JSON.stringify({
      rooms: rooms,
      company: company //company_id:"40743"
    });

    UtilityService.getListObjectWithParam(
      "owners",
      "list_owners_by_room_id",
      $scope.json_chuho
    ).success(function(response) {
      // console.log(response, $scope.json_room)
      if (response.err === 0) {
        if (
          response.dt.owners_list.length !== "" &&
          response.dt.owners_list.length !== undefined
        ) {
          $scope.owners_list = response.dt.owners_list; //show data chu ho(dropdown list)
          owners_list = response.dt.owners_list; //temp thuc hien thao tac doi du lieu parseInt(id)
          // console.table(owner_list);
          // console.table($scope.owners_list);
          if (owners_list != null && owners_list.length > 0) {
            for (i = 0; i < owners_list.length; i++) {
              var item = {
                owner_id: parseInt(owners_list[i].owner_id),
                owner_name: owners_list[i].owner_name,
                room_id: parseInt(owners_list[i].room_id),
                room_name: owners_list[i].room_name
              };
              owners_list[i].owner_id = item.owner_id;
              owners_list[i].owner_name = item.owner_name;
              owners_list[i].room_id = item.room_id;
              owners_list[i].room_name = item.room_name;
              // $scope.owners_list = owners_list[i];
            }

            //show thong tin chu ho email/phone
            if ($scope.owners_list != null && $scope.owners_list.length > 0) {
              // alert("vaoday")
              for (var i = 0; i < $scope.owners_list.length; i++) {
                if ($scope.it.owner_id === $scope.owners_list[i].owner_id) {
                  $scope.it.cell_phone = $scope.owners_list[i].phone;
                  $scope.it.email_address = $scope.owners_list[i].email;
                }
              }
            }
          }
        }
      }
    });
  }