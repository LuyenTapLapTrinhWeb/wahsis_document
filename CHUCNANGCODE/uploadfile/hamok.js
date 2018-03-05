$scope.ok = function () {
    if ($scope.kiemtra_checknull_true()) {
      $scope.language_tam = { language_id: "" };
      // console.log($scope.master_data);
      //pms-dev.wahsis.net/api/master?cm=add&dt={"company":{"company_id":40743},"master_data":{"group_id":"BANK","master_data_id":"","prefix":"BAK","master_data_name":"Agribank","description":"Ngânhàngpháttriểnnôngthôn","freefield2":"1","created_id":false},"languages":{"language_id":"vi"}}
      http: var url = API_URL + "master";
      var cmd = "";
      if (loai === "create") {
        $scope.language_tam.language_id = getLanguage($scope.language_id);
        cmd = "add";
        $scope.master_data = {
          group_id: getString($scope.thongtingroup.master_group_id),
          master_data_id: getString($scope.it.master_data_id),
          prefix: getString($scope.thongtingroup.prefix),
          master_data_name: getString($scope.it.master_data_name),
          description: getString($scope.it.description),
          freefield1: getString($scope.it.freefield1),
          freefield2: getString($scope.it.freefield2),
          image_path: JSON.stringify($scope.new_array_img),
          created_id:
            $scope.thongtingroup
              .created_id /**return err = created_id === true ? -2 */
        };
        var jsonFinal = JSON.stringify({
          company: { company_id: com_id },
          master_data: JSON.parse(JSON.stringify($scope.master_data)),
          languages: $scope.language_tam
        });
        // console.log(jsonFinal);
      } else {
        $scope.language_tam.language_id = getLanguage($scope.it.language_id);

        cmd = "update";
        $scope.master_data = {
          group_id: getString($scope.thongtingroup.master_group_id),
          master_data_id: getString($scope.it.master_data_id),
          master_data_name: getString($scope.it.master_data_name),
          freefield1: getString($scope.it.freefield1),
          freefield2: getString($scope.it.freefield2),
          description: getString($scope.it.description),
          created_id: $scope.thongtingroup.created_id /**return err = created_id === true ? -2 */,
          created_by_id: u_id,
          created_by_name: u_name,
          image_path: JSON.stringify($scope.new_array_img)
        };
        var jsonFinal = JSON.stringify({
          company: { company_id: com_id },
          master_data: JSON.parse(JSON.stringify($scope.master_data)),
          languages: $scope.language_tam
        });
      }
      //get all param values using jquery
      // console.log(url + "?cm=" + cmd + "&dt=" + jsonFinal);
      $http({
        method: "POST",
        url: url,
        data: $.param({
          cm: cmd,
          dt: jsonFinal
        }) /**pms-dev.wahsis.net/api/master? */,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .success(function (response) {
          utility.check_error403(response.err);
          if (response.err !== -1) {
            swal({
              title: $filter("translate")("Notice"),
              text: $filter("translate")("Save_Success"),
              timer: 2000,
              type: "success"
            });
            $uibModalInstance.close();
          } else if (response.err === -2) {
            swal({
              title: $filter("translate")("Notice"),
              text: $filter("translate")("duplicate_infomation"),
              timer: 2000,
              type: "error"
            });
          } else {
            swal({
              title: $filter("translate")("Notice"),
              text: $filter("translate")("Save_Error"),
              timer: 2000,
              type: "error"
            });
          }
        })
        .error(function (response) {
          utility.check_error403(response.err);
          swal({
            title: $filter("translate")("Notice"),
            text: $filter("translate")("Save_Error"),
            timer: 2000,
            type: "error"
          });
        });
    }//kiem tra check null true
  };