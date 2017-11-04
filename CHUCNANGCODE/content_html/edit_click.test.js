$scope.edit = function () {
  $rootScope.checkLogout()
  var row = $scope.selected;
  //  console.log(row[0]);

  // console.log()
  if (row.length > 0) {

      $scope.ri = row[0];
      $scope.resident_incident_json = {resident_incident_id: row[0].resident_incident_id}
      $scope.resident_incidentJSON = JSON.stringify({
          resident_incident: $scope.resident_incident_json,
          company: $scope.company,
          languages: $scope.languageTemp
      });
      UtilityService.getListObjectWithParam("resident_incident", "detail", $scope.resident_incidentJSON).then(function (response) {
          // console.log(response);
          if (response.data.err === 0) {
              // console.log("0ddddddd", response)
              if (response.data.dt.resident_incident.status === 0) {
                  swal("Warning!", "Can't modify", "warning");
                  return;
              } else {
                  openPopup($scope.resident_incident_list, response.data.dt.resident_incident);
              }
          }
      });

  } else {
      swal({
          title: "Please choose item to edit!",
          timer: 1240,
          showConfirmButton: false,
          type: "error"
      });
  }
};


$scope.edit = function() {
    $rootScope.checkLogout();
    var row = $scope.selected;
    var room_posted_for_sale = {
      room_posted_for_sale_id: row[0].room_posted_for_sale_id
    };
    var company = { company_id: "40743" };
    $scope.json_room_posted_for_sale = JSON.stringify({
      room_posted_for_sale: room_posted_for_sale,
      company: company, //company_id:"40743",
      languages: $scope.languageTemp
    });

    UtilityService.getListObjectWithParam(
      "room_posted_for_sale",
      "detail",
      $scope.json_room_posted_for_sale
    ).success(function(response) {
      // console.log(response, $scope.json_room)
      if (response.err === 0) {
        $scope.dt_room_posted_for_sale = response.dt.room_posted_for_sale;
      }
    });
    if ($scope.dt_room_posted_for_sale > 0) {
      openPopup(row[0].room_posted_for_sale_id, dt_room_posted_for_sale);
    } else {
      swal({
        title: "Please choose item to edit!",
        timer: 1240,
        showConfirmButton: false,
        type: "error"
      });
    }
  };