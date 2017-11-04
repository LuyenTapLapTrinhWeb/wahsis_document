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
    var room_id_edit = 0;
    for (var i = 0; i < $scope.rooms_list.length; i++) {
      if ($scope.it.room_id === $scope.rooms_list[i].room_id) {
        room_id_edit = $scope.rooms_list[i].room_id;
      }
    }
    var rooms = { room_id: room_id_edit };
    var company = { company_id: "40743" };
    $scope.json_chuho = JSON.stringify({
      rooms: rooms,
      company: company //company_id:"40743"
    });

    UtilityService.getListObjectWithParam(
      "owners",
      "list_owners_by_room_id",
      $scope.json_chuho
    ).success(
      function(response) {
        // console.log(response, $scope.json_room)
        if (response.err === 0) {
          $scope.owners_list = response.dt.owners_list;
          for (var i = 0; i < $scope.owners_list.length; i++) {
            for (var j = 0; j < $scope.rooms_list.length; j++) {
              if (
                $scope.rooms_list[j].room_id === $scope.owners_list[i].room_id
              ) {
                if (item.owner_id === $scope.owners_list[i].owner_id) {
                  $scope.it.owner_id = $scope.owners_list[i].owner_id;
                  $scope.it.owner_name = $scope.owners_list[i].owner_name;
                  $scope.it.cell_phone = $scope.owners_list[i].phone;
                  $scope.it.email_address = $scope.owners_list[i].email;
                }
              }
            }
          }
        }
      },
      function(err) {
        alert(err);
      }
    );
  }
});

if (item.resident_incident_id !== 0) {
  /**
      * json-edit
      * owner-list
      */
  $scope.str_room_contacts = { room_id: $scope.it.room_id };

  var room_contacts_var = JSON.stringify({
    room_contacts: $scope.str_room_contacts,
    company: $scope.company,
    languages: $scope.languageTemp
  });

  UtilityService.getListObjectWithParam(
    "room_contacts",
    "list",
    room_contacts_var
  ).success(function(success) {
    // console.table(success);
    if (success.err === 0) {
      $scope.owners_list = success.dt.room_contacts_list;
      //room_contact_id : ?? | $scope.item.resident_id: ? ?
      // var room_contact_id = $scope.item.resident_id;
      // ghi chú: resident_id chính là room_contact_id
      for (let i = 0; i < $scope.owners_list.length; i++) {
        if ($scope.it.room_id === $scope.owners_list[i].room_id) {
          if (
            $scope.item.resident_id === $scope.owners_list[i].room_contact_id
          ) {
            $scope.it.owner_id = $scope.owners_list[i].room_contact_id;
          }
        }
      }
    }
  });
}

/**search.chu ho cho thue dang ban
   * http://pms-dev.wahsis.net/api/
      owners?cm=list_owners_by_room_id&dt={"rooms":{"room_id":9},"company":{"company_id":40743}}
  */
var rooms = { room_id: $scope.it.room_id };
var company = { company_id: "40743" };
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
    $scope.owners_list = response.dt.owners_list;
  }
});

// ---------------
/**
        * json-edit
        * owner-list
        //hien thong tin select cu dan theo room
        */
$scope.str_room_contacts = { room_id: $scope.it.room_id };

var room_contacts_var = JSON.stringify({
  rooms: $scope.str_room_contacts,
  company: $scope.company
});

UtilityService.getListObjectWithParam(
  "owners",
  "list_owners_by_room_id",
  room_contacts_var
).success(function(success) {
  // console.table(success);
  if (success.err === 0) {
    $scope.owners_list = success.dt.owners_list;
    
  }
});
