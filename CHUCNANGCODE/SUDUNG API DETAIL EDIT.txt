$scope.edit = function() {
    $rootScope.checkLogout();
    var row = $scope.selected;
    if (row.length > 0) {
      $scope.room_posted_for_sale_json = {
        room_posted_for_sale_id: row[0].room_posted_for_sale_id
      };
      $scope.room_posted_for_saleJSON = JSON.stringify({
        room_posted_for_sale: $scope.room_posted_for_sale_json,
        company: $scope.company,
        languages: $scope.languageTemp
      });
      UtilityService.getListObjectWithParam(
        "room_posted_for_sale",
        "detail",
        $scope.room_posted_for_saleJSON
      ).then(function(response) {
        console.log(response);
        if (response.data.err === 0) {
          var room_posted_for_sale = response.data.dt.room_posted_for_sale;
          openPopup(row[0].room_posted_for_sale_id, room_posted_for_sale);
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