
  UtilityService.decentralization("pms_apartment_for_sale_view").then(function(
    response
  ) {
    if (response.data.err === 0 && response.data.dt !== undefined) {
      $scope.allow = utility.get_allow(response.data);
      if (response.data.dt.permission_list.length > 0) {
        if (response.data.dt.permission_list[0].allow_edit === true) {
          $scope.room_posted_for_sale_click = function(id, item) {
            $("tr").removeClass("clicked");
            $("#room_posted_for_sale_" + id).addClass("clicked");
            $scope.selected = [];
            $scope.selected.push(item);
          };
          $scope.room_posted_for_sale_dbclick = function(id, item) {
            $scope.edit();
          };
          $scope.$watch(
            function($scope) {
              return ($scope.abc = $filter("translate")("NOTE_FORMAT1"));
            },
            function() {
              $scope.status_list = [
                { value: 0, name: $filter("translate")("APFS_STATUS_PENDING") },
                { value: 1, name: $filter("translate")("APFS_STATUS_FORSALE") },
                { value: 2, name: $filter("translate")("APFS_STATUS_SOLD") },
                { value: 3, name: $filter("translate")("APFS_STATUS_CANCEL") }
              ];
              //hien ngay hien tai
              var c_date = $filter("date")(new Date(), format_date);
              $scope.toDate = c_date;
  
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
  
              // show list search
              $scope.getData($scope.item_per_page, 1);
            }
          );
          //dang sua o day. api bi loi
          $scope.str_search = {
            status: -1
          };
          $scope.getData = function(page_size, page_index) {
            if (
              page_index === undefined ||
              page_index === "" ||
              page_index === null
            )
              $scope.currentPage1 = 1;
            $scope.page = { page_index: page_index, page_size: page_size };
            $scope.languageTemp = {
              language_id: $scope.language_id
            };
            var json = JSON.stringify({
              room_posted_for_sale: $scope.str_search,
              page: $scope.page,
              company: $scope.company,
              languages: $scope.languageTemp
            });
            // http://pms-dev.wahsis.net/api/room_posted_for_sale?cm=search&dt={"room_posted_for_sale":{"status":-1},"page":{"page_index":1,"page_size":10},"languages":{"language_id":"vi"},"company":{"company_id":40743}}
            // list search
            // http://pms-dev.wahsis.net/api/room_posted_for_sale?cm=search&dt={"room_posted_for_sale":{"status":-1},"page":{"page_index":1,"page_size":10},"languages":{"language_id":"vi"},"company":{"company_id":40743}}
            UtilityService.getListObjectWithParam(
              "room_posted_for_sale",
              "search",
              json
            ).then(function(response) {
              // console.log(response, json);
              if (response.data.err === 0) {
                $scope.room_posted_for_sale_list =
                  response.data.dt.room_posted_for_sale_list;
                if ($scope.room_posted_for_sale_list.length > 0) {
                  for (
                    var i = 0;
                    i < $scope.room_posted_for_sale_list.length;
                    i++
                  ) {
                    $scope.room_posted_for_sale_list[i].stt = (parseInt($scope.currentPage1) - 1) * $scope.item_per_page +   i + 1;
                    if($scope.room_posted_for_sale_list[i].status === 0){
                      $scope.room_posted_for_sale_list[i].status = $filter("translate")("APFS_STATUS_PENDING");
                    }else{
                      if($scope.room_posted_for_sale_list[i].status ===1 ){
                        $scope.room_posted_for_sale_list[i].status = $filter("translate")("APFS_STATUS_FORSALE");
                      }
                      else{
                        if($scope.room_posted_for_sale_list[i].status ===2 ){
                          $scope.room_posted_for_sale_list[i].status = $filter("translate")("APFS_STATUS_SOLD");
                        }
                        else{
                          if($scope.room_posted_for_sale_list[i].status ===2 ){
                            $scope.room_posted_for_sale_list[i].status = $filter("translate")("APFS_STATUS_CANCEL");
                          }
                        }
                      }
                    } 
                  }
                }
                $scope.total_page = response.data.dt.page.total_page;
                $scope.total_row = response.data.dt.page.total_row;
                $scope.list_page = [];
                for (var i = 1; i <= $scope.total_page; i++) {
                  var j = {
                    val: "",
                    test: ""
                  };
                  j.val = i;
                  j.test = i;
                  $scope.list_page.push(j);
                }
              }
            });
            $scope.selected = [];
          };
  
          $scope.item_per_page2 = function() {
            $scope.getData($scope.item_per_page, 1);
          };
        }
        
       
      }
    }
  });