function questionmarksController(
  $scope,
  $rootScope,
  $http,
  API_URL,
  $uibModal,
  UtilityService,
  currencyService,
  $resource,
  DTOptionsBuilder,
  $filter
) {
  /**batdau caidat doituong{rootscope.is_menu}*/
  $scope.dtOptions = DTOptionsBuilder.newOptions();
  $rootScope.Is_Menu = "apartment";
  $rootScope.ShowLeftMenu($rootScope.main_menu, "apartment");
  $rootScope.color_top_menu("apartment");
  $rootScope.is_load_dashboard = false;
  $rootScope.is_load_project = false;
  $rootScope.is_load_apartment = true;
  $rootScope.is_load_hotel = false;
  $rootScope.is_load_service = false;
  $rootScope.is_load_profile = false;
  $rootScope.is_load_notification = false;
  $rootScope.is_load_report = false;
  $rootScope.is_load_approvals = false;
  $rootScope.is_load_setting = false;
  /**ketthuc caidat doituong{rootscope.is_menu}*/

  /**batdau khaibao doi_tuong{api.search.object} */
  $scope.str_search = {
    //? viet theo cau api luc anh khiem moi giao task.
  };
  $scope.languageTemp = { language_id: language };
  $scope.company = { company_id: com_id };
  /**ketthuc khaibao doi_tuong{api.search.object} */

  //**batdau khaibao doi_tuong{menu.search.phantrang} */
  var json_value = getCookieJson("pms-dev-format");
  $scope.item_per_page = JSON.parse(json_value).item_per_page;
  $scope.item_per_page_list = JSON.parse(json_value).item_per_page_list;
  $scope.page_length = page_length;
  $scope.currentPage1 = 1;
  $scope.page = {};
  for (var j = 0; j < $scope.item_per.length; j++) {
    $scope.item_per_page1.push({
      value: $scope.item_per[j],
      text: $scope.item_per[j]
    });
  }
  /**ketthuc khaibao doi_tuong{menu.search.phantrang}*/
  //khaibao danh_sach[api.search.component]
  $scope.list_page = [];
  $scope.item_per_page1 = [];
  $scope._questionmarklist_ = [];
  $scope.selected = [];

  /**batdat viet {phuong_thuc:"load.api.search.lansau"}*/
  $scope.load_info = (page_size, page_index) => {
    if (page_index === undefined) {
      page_index = 1;
      $scope.currentPage1 = 1;
    }
    $scope.page = { page_size: page_size, page_index: page_index };

    var dt = JSON.stringify({
      questionmarktable: JSON.parse(JSON.stringify($scope.str_search)),
      company: JSON.parse(JSON.stringify($scope.company)),
      languages: JSON.parse(JSON.stringify($scope.languageTemp)),
      page: JSON.parse(JSON.stringify($scope.page))
    });
    UtilityService.getListObjectWithParam(
      "questionmark_api",
      "questionmark_cm",
      dt
    ).success(response => {
      if (response.err === 0) {
        console.log(response, dt);
        $scope._questionmarklist_ = response.dt._questionmarklist_;
        //*.stt?
        if ($scope._questionmarklist_.length > 0) {
          for (var i = 0; i < $scope._questionmarklist_.length; i++) {
            $scope._questionmarklist_[i].stt =
              (parseInt($scope.currentPage1) - 1) * $scope.item_per_page +
              i +
              1;
          }
        }
        //*.\stt?
        $scope.list_page = [];
        $scope.total_page = response.dt.page.total_page;
        $scope.total_row = response.dt.page.total_row;

        for (var i = 1; i <= $scope.total_page; i++) {
          var j = { val: "", test: "" };
          j.val = i;
          j.test = i;
          $scope.list_page.push(j);
        }
      }
    });
  };
  /**ketthuc viet {phuong_thuc:"load.api.search.lansau"}*/
  $scope.load_data = loai => {
    $rootScope.checkLogout();
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

    $scope.page = {
      page_index: $scope.currentPage1,
      page_size: $scope.item_per_page
    };

    $scope.load_info($scope.item_per_page, $scope.currentPage1);
  };
  /*ketthuc khaibao phuong_thuc(api.search.condition)*/
  /*batdau viet phuong_thuc:"api.search.component"*/
  $scope.$watch(
    $scope => {
      return ($scope.abc = $filter("translate")("NOTE_FORMAT1"));
    },
    () => {
      /**batdat viet {phuong_thuc:"load.api.search.landau"}*/
      /**ketthuc viet {phuong_thuc:"load.api.search.landau"}*/
    }
  );
  //batdau viet phantrang decentralization("").then(success=>{},err=>{})
  UtilityService.decentralization("pms_questionmark?").then(
    success => {
      if (response.data.err === 0 && response.data.dt !== undefined) {
        $scope.allow = utility.get_allow(response.data);
        if (response.data.dt.permission_list.length > 0) {
          if (response.data.dt.permission_list[0].allow_edit === true) {
            $scope.questionmarks_click = (id, item) => {
              $("tr").removeClass("clicked");
              $("#questionmarks?_" + id).addClass("clicked");
              $scope.selected = [];
              $scope.selected.push(item);
            };
            $scope.questionmarks_dbclick = (id, item) => {
              $rootScope.checkLogout();
              $scope.selected = [];
              $scope.selected.push(item);
              openPopup($scope.questionmarksList, $scope.selected[0]);
            };
            $scope.page = { page_index: 1, page_size: 10000 };
            /**questionmark 
             * batdau viet {api.component} neu co*/
            //Happy! Go!
            /**ketthuc viet {api.component} neuco */
            $scope.load_info($scope.item_per_page, 1);
            $scope.item_per_page2 = () => {
              $scope.load_info($scope.item_per_page, 1);
            };
          }
        }
      }
    },
    err => {
      console.log("fix questionmark now!");
    }
  );
  //**batdau viet phuongthuc popup */
  function openPopup(grid, ser) {
    $rootScope.checkLogout();
    var modalInstance = $uibModal
      .open({
        templateUrl: "",
        controller: 0,
        windowClass: "animated fadeInDown",
        draggable: true,
        size: "md",
        locked: true,
        resolve: {
          grid: () => {
            return grid;
          },
          item: () => {
            return ser;
          }
        }
      })
      .result.then(
        () => {
          //success
          $scope.load_info($scope.item_per_page, 1);
          $scope.selected = [];
        },
        () => {
          //error
          swal(
            "Warning!",
            "CHƯA CÀI ĐẶT templateUrl & controller, " +
              "nhớ KHÓA thong bao nay sau khi fix.",
            "Warning!"
          );
        }
      );
  }
  //**ketthuc viet phuongthuc popup */
  /*batdau khaibao {phuong_thuc:"api.search.().condition}*/
  $scope.search = () => {
    /**batdau viet thuoc_tinh({"key":"value"}) */
    $scope.str_search = {
      _questionmarkkey: "_q?"
    };
    /**ketthuc viet thuoc_tinh({"key":"value"}) */
    /**batdau viet search.condition */
    if (
      $scope._questionmarkvalue !== undefined &&
      $scope._questionmarkvalue !== ""
    )
      $scope.str_search._questionmarkkey = $scope._questionmarkvalue;
    /*var check_dinhdang = {
      kieu_ngay_thang: "change_date_to_save",
      kieu_so_nhap_form_search_new: "so_thap_phan_khong_gioi_han",
      kieu_so: "change_number",
    };*/
    /**ketthuc viet search.condition */
    console.log($scope.str_search);
    $scope.load_info($scope.item_per_page, 1);
  };
  /*kethuc khaibao {phuong_thuc:"api.search.().condition}*/
  $scope.add = () => {
    $rootScope.checkLogout();
    //?
    openPopup($scope._questionmarklist_, { questionmark_id: 0 });
  };
  $scope.edit = () => {
    $rootScope.checkLogout();
    //? cau api deltail edit cua em dau?
    var row = $scope.selected;
    if (row.length > 0) {
      var json = {
        questionmarks_id: row[0].questionmarks_id
      };
      $scope.dtJSON = JSON.stringify({
        questionmarks: json,
        company: $scope.company,
        languages: $scope.languageTemp
      });
      UtilityService.getListObjectWithParam(
        "questionmarksAPI",
        "detail",
        $scope.dtJSON
      ).then(response => {
        console.log(response);
        if (response.data.err === 0) {
          var questionmarksObject = response.data.dt.questionmarksObject;
          openPopup(row[0].questionmarks_id, questionmarksObject);
        }
      });
    } else {
      swal({
        title: $filter("translate")("edit_item"),
        timer: 1240,
        showConfirmButton: false,
        type: "error"
      });
    }
  };
  $scope.delete = () => {
    var previousWindowKeyDown = window.onkeydown;
    $rootScope.checkLogout();
    var row = $scope.selected;
    if (row.length > 0) {
      var previousWindowKeyDown = window.onkeydown;
      swal(
        {
          title: $filter("translate")("Are_you_sure"),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false
        },
        () => {
          window.onkeydown = previousWindowKeyDown;
          $scope.object = { agent_id: $scope.selected[0].agent_id };
          var dtJSON = JSON.stringify({
            agents: JSON.parse(JSON.stringify($scope.object)),
            company: JSON.parse(JSON.stringify($scope.company)),
            languages: JSON.parse(JSON.stringify($scope.languageTemp))
          });
          UtilityService.deleteObject(
            $scope.tableAgents,
            dtJSON
          ).then(response => {
            if (response.data.err === 0) {
              $scope.load_info($scope.item_per_page, 1);
              $scope.selected = [];
              swal(
                "Deleted!",
                $filter("translate")("delete_success"),
                "success"
              );
            } else {
              swal("Deleted!", $filter("translate")("delete_error"), "error");
            }
          });
        }
      );
    } else {
      swal({
        title: $filter("translate")("delete_item"),
        timer: 1240,
        showConfirmButton: false,
        type: "error"
      });
    }
  };
} /**kethuc function search */

