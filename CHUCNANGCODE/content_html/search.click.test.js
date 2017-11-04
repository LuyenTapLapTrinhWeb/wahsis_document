
  //dang sua o day. api bi loi
  $scope.str_search = {
    status: -1
  };
  $scope.getData = function(page_size, page_index) {
    if (page_index === undefined || page_index === "" || page_index === null)
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
          for (var i = 0; i < $scope.room_posted_for_sale_list.length; i++) {
            $scope.room_posted_for_sale_list[i].stt =
              (parseInt($scope.currentPage1) - 1) * $scope.item_per_page +
              i +
              1;
            if ($scope.room_posted_for_sale_list[i].status === 0) {
              $scope.room_posted_for_sale_list[i].status = $filter("translate")(
                "APFS_STATUS_PENDING"
              );
            }
            if ($scope.room_posted_for_sale_list[i].status === 1) {
              $scope.room_posted_for_sale_list[i].status = $filter("translate")(
                "APFS_STATUS_FORSALE"
              );
            }

            if ($scope.room_posted_for_sale_list[i].status === 2) {
              $scope.room_posted_for_sale_list[i].status = $filter("translate")(
                "APFS_STATUS_SOLD"
              );
            }

            if ($scope.room_posted_for_sale_list[i].status === 3) {
              $scope.room_posted_for_sale_list[i].status = $filter("translate")(
                "APFS_STATUS_CANCEL"
              );
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

  // condition search
  $scope.search = function() {
    if (
      $scope.room_id === undefined ||
      $scope.room_id === "" ||
      $scope.room_id === null
    ) {
      $scope.str_search.room_id = "";
    } else {
      $scope.str_search.room_id = $scope.room_id;
    }
    if (
      $scope.owner_name === undefined ||
      $scope.owner_name === "" ||
      $scope.owner_name === null
    ) {
      $scope.str_search.owner_name = "";
    } else {
      $scope.str_search.owner_name = $scope.owner_name;
    }
    $scope.getData($scope.item_per_page, 1);
  };

  $scope.item_per_page2 = function() {
    $scope.getData($scope.item_per_page, 1);
  };
  $scope.load_data = function(loai) {
    console.log($scope.str_search);
    if ($scope.currentPage1 === undefined) $scope.currentPage1 = 1;
    if (loai === 1) {
      $scope.currentPage1 = $scope.currentPage1 - 1;
    }
    if (loai === 3) {
      $scope.currentPage1 = $scope.currentPage1 + 1;
    }
    if (loai === 4) {
      $scope.currentPage1 = 1;
    }
    if (loai === 5) {
      $scope.currentPage1 = $scope.total_page;
    }

    $scope.getData($scope.item_per_page, $scope.currentPage1);
  };
