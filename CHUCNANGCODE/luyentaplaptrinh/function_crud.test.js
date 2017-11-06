/**batdau function new */
function questionmarksControllerCrud(
    $filter,
    item,
    grid,
    $http,
    $scope,
    $uibModalInstance,
    API_URL,
    currencyService,
    UtilityService,
    UtilityCheckFormatService
  ) {
    var today = new Date();
    $scope.currentDay = $filter("date")(today, "yyyy-MM-dd ");
    $scope.languageTemp = { language_id: language };
    $scope.company = { company_id: com_id };
    $scope.close = () => {
      $uibModalInstance.close();
    };
    $scope.item = [];
    $scope.item = item;
    $scope.it = angular.copy($scope.item);
    $scope.flag = {
      //disable button
      //chia nut add/update
    };
    /**FIX CAI BUG HIEN THI GIAO DIEN DU LIEU */
  
    if (item.room_posted_for_sale_id === 0) {
      //add
    } else {
      //edit
  
      //hienthithongtincanho
      $scope.json_rooms = JSON.stringify({
        company: $scope.company, //company_id:"40743"
        languages: $scope.languageTemp //language_id:"vi"
      });
      UtilityService.getListObjectWithParam(
        "rooms",
        "list",
        $scope.json_rooms
      ).success(response => {
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
        } else {
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
    /**CAIDAT DANHSACH COMPONENT*/
    /**Ham ok */
    $scope.ok = () => {
      $scope.object = {
        //questionmark object gioihanphamviluu.png
      };
      if (item.questionmark_id == 0) {
        //add
        $scope.dtObject = JSON.stringify({
          questionmarktable: $scope.object,
          company: $scope.company
        });
        console.log("dtObject", $scope.dtObject);
        UtilityService.addObject(
          "questionmarktable",
          $scope.dtObject
        ).then(response => {
          if (response.data.err === 0) {
            $uibModalInstance.close();
            swal($filter("translate")("SUCCESS"), "Success!", "success");
          } else {
            swal($filter("translate")("WARNING"), "Save error!", "warning");
          }
        });
      } else {
        //edit
        $scope.object = {
          //questionmark object gioihanphamviluu.png
        };
        $scope.dtObject = JSON.stringify({
          questionmarktable: $scope.object,
          company: JSON.parse(JSON.stringify($scope.company)),
          languages: JSON.parse(JSON.stringify($scope.languageTemp))
        });
        console.log($scope.dtObject);
        UtilityService.updateObject(
          "questionmarktable",
          $scope.dtObject
        ).then(response => {
          if (response.data.err === 0) {
            $uibModalInstance.close();
  
            swal($filter("translate")("SUCCESS"), "Success!", "success");
          } else {
            swal($filter("translate")("WARNING"), "Save error!", "warning");
          }
        });
      }
    };
  }
  /**kethuc function new*/