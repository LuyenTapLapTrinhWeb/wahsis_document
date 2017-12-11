
function report_for_sale_controller($scope, $timeout, UtilityCheckFormatService, API_URL_WAHSIS, $filter, DTOptionsBuilder, $rootScope, $http, API_URL, $uibModal, UtilityService, UtilityCheckFormatService, translationService, $resource) {
    $rootScope.checkLogout();
    $rootScope.main_user_guid_userguid_id_show_popup = "pms_report_apartment_fee_for_sale";
    $rootScope.main_user_guid_module_id_show_popup = "pms";
    var json_value = getCookieJson("pms-dev-format");
    $scope.logo = $rootScope.logo_company_main;
    $rootScope.Is_Menu = 'report';
    $rootScope.ShowLeftMenu($rootScope.main_menu, 'report')
    $rootScope.color_top_menu("report")
    $rootScope.is_load_dashboard = false
    $rootScope.is_load_project = false
    $rootScope.is_load_apartment = false
    $rootScope.is_load_hotel = false
    $rootScope.is_load_service = false
    $rootScope.is_load_profile = false
    $rootScope.is_load_notification = false
    $rootScope.is_load_report = true
    $rootScope.is_load_approvals = false
    $rootScope.is_load_setting = false
    UtilityService.decentralization("pms_report_apartment_fee_for_sale").then(function (response) {
      if (response.data.err === 0 && response.data.dt !== undefined) {
        $scope.allow = utility.get_allow(response.data);
        if (response.data.dt.permission_list.length > 0) {
          $scope.branch = { company_id: com_id }
          var dtJSONCompany = JSON.stringify({ company: $scope.branch })
          UtilityService.getListObjectWithParamDev("company", "detail", dtJSONCompany).then(function (response) {
            if (response.data.err === 0) {
              console.log(response)
              $scope.branch_detail = response.data.dt.company;
            }
          });
          $scope.load_list_pdf = function () {
            $scope.page_pdf = { page_index: 1, page_size: 1 };
            $scope.json_pdf = JSON.stringify({ booking_report: JSON.parse(JSON.stringify($scope.str_search)), report_info: JSON.parse(JSON.stringify($scope.report)), company: JSON.parse(JSON.stringify($scope.company)), page: JSON.parse(JSON.stringify($scope.page_pdf)), languages: JSON.parse(JSON.stringify($scope.languageTemp)) });
            UtilityService.getListObjectWithParam("report_info", "report", $scope.json_pdf).then(function (response) {
              if (response.data.err === 0) {
                $scope.page_pdf1 = { page_index: 1, page_size: response.data.dt.page.total_row };
                $scope.json_pdf1 = JSON.stringify({ booking_report: JSON.parse(JSON.stringify($scope.str_search)), report_info: JSON.parse(JSON.stringify($scope.report)), company: JSON.parse(JSON.stringify($scope.company)), page: JSON.parse(JSON.stringify($scope.page_pdf1)), languages: JSON.parse(JSON.stringify($scope.languageTemp)) });
                UtilityService.getListObjectWithParam("report_info", "report", $scope.json_pdf1).then(function (response) {
                  if (response.data.err === 0) {
                    $scope.pdf_list = response.data.dt.booking_list;
                    $scope.total_customer = 0;
                    $scope.total_night = 0;
                    $scope.total_revenue = 0;
                    for (var i = 0; i < $scope.pdf_list.length; i++) {
                      $scope.total_customer += parseFloat($scope.pdf_list[i].customers);
                      $scope.total_night += parseFloat($scope.pdf_list[i].night);
                      $scope.total_revenue += parseFloat($scope.pdf_list[i].grand_total);
  
                      $scope.pdf_list[i].stt = (parseInt($scope.currentPage1) - 1) * $scope.item_per_page + i + 1;
                      $scope.pdf_list[i].customers = UtilityCheckFormatService.change_number($scope.pdf_list[i].customers);
                      $scope.pdf_list[i].night = UtilityCheckFormatService.change_number($scope.pdf_list[i].night);
                      $scope.pdf_list[i].grand_total = UtilityCheckFormatService.change_number($scope.pdf_list[i].grand_total);
                    }
                    $scope.total_customer = UtilityCheckFormatService.change_number($scope.total_customer);
                    $scope.total_night = UtilityCheckFormatService.change_number($scope.total_night);
                    $scope.total_revenue = UtilityCheckFormatService.change_number($scope.total_revenue);
                  }
                });
              }
            });
          };
          $scope.loadInfo = function (page_size, page_index) {
            $scope.languageTemp = { language_id: $scope.language_id };
            if (page_index === undefined || page_index === "" || page_index === null)
              $scope.currentPage1 = 1;
            $scope.page = { page_index: page_index, page_size: page_size }
            var dtJSON = JSON.stringify({ booking_report: JSON.parse(JSON.stringify($scope.str_search)), report_info: JSON.parse(JSON.stringify($scope.report)), company: JSON.parse(JSON.stringify($scope.company)), page: JSON.parse(JSON.stringify($scope.page)), languages: JSON.parse(JSON.stringify($scope.languageTemp)) });
            UtilityService.getListObjectWithParam("report_info", "report", dtJSON).then(function (response) {
              console.log(response, dtJSON)
              if (response.data.err === 0) {
                $scope.booking_list = response.data.dt.booking_list;
                if ($scope.booking_list.length === 0)
                  $scope.show = true;
                else
                  $scope.show = false;
                for (var i = 0; i < $scope.booking_list.length; i++) {
                  $scope.booking_list[i].stt = (parseInt($scope.currentPage1) - 1) * $scope.item_per_page + i + 1;
                  $scope.booking_list[i].customers = UtilityCheckFormatService.change_number($scope.booking_list[i].customers);
                  $scope.booking_list[i].night = UtilityCheckFormatService.change_number($scope.booking_list[i].night);
                  $scope.booking_list[i].grand_total = UtilityCheckFormatService.change_number($scope.booking_list[i].grand_total);
                }
                $scope.total_page = response.data.dt.page.total_page;
                $scope.total_row = response.data.dt.page.total_row;
                $scope.list_page = [];
                for (var i = 1; i <= $scope.total_page; i++) {
                  var j = { val: "", test: "" };
                  j.val = i;
                  j.test = i;
                  $scope.list_page.push(j);
                }
              }
            });
          }
          $scope.load_list_pdf()
        }
      }
    });
  
  
  
    $scope.search = function () {
      $rootScope.checkLogout()
      $scope.selected_tam = ""
      if ($scope.selected.length > 0) {
        for (var i = 0; i < $scope.location_list.length; i++) {
          for (var j = 0; j < $scope.selected.length; j++) {
            if ($scope.location_list[i].location_id === parseInt($scope.selected[j])) {
              if ($scope.location_list[i].types === 3) {
                if ($scope.selected_tam === "") {
                  $scope.selected_tam = $scope.location_list[i].location_id;
                } else {
                  $scope.selected_tam = $scope.selected_tam + "," + $scope.location_list[i].location_id;
                }
              }
            }
          }
        }
        $scope.str_search.list_location_id = $scope.selected_tam;
        console.log("sssssssss", $scope.str_search.list_location_id);
      } else
        $scope.str_search.list_location_id = ""
      if ($scope.from_date !== undefined && $scope.from_date !== "" && $scope.from_date !== null) {
  
        if (UtilityCheckFormatService.check_date($scope.from_date.split("-")) === false) {
          swal("Warning!", "From date don't match format.", "warning");
          return;
        } else {
          $scope.str_search.from_date = UtilityCheckFormatService.change_date_to_save($scope.from_date)
        }
      } else {
        $scope.str_search.from_date = ""
      }
      if ($scope.to_date !== undefined && $scope.to_date !== "" && $scope.to_date !== null) {
        if (UtilityCheckFormatService.check_date($scope.to_date.split("-")) === false) {
          swal("Warning!", "To date don't match format.", "warning");
          return;
        } else {
          $scope.str_search.to_date = UtilityCheckFormatService.change_date_to_save($scope.to_date)
        }
      } else {
        $scope.str_search.to_date = ""
      }
      if ($scope.from_date !== undefined && $scope.from_date !== "" && $scope.from_date !== null && $scope.to_date !== undefined && $scope.to_date !== "" && $scope.to_date !== null) {
        if (UtilityCheckFormatService.check_date_from_to($scope.from_date, $scope.to_date) === false) {
          swal("Warning!", "To date much be greater than From date", "warning");
          return;
        }
      }
      console.log($scope.str_search);
      $scope.loadInfo($scope.item_per_page, 1)
      $scope.load_list_pdf();
    }
    $scope.pdf = function () {
      $rootScope.checkLogout()
      var contents = $("#bill").html();
      var frame1 = document.createElement('iframe');
      frame1.name = "frame1";
      frame1.style.position = "absolute";
      frame1.style.top = "-1000000px";
      document.body.appendChild(frame1);
      var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
      frameDoc.document.open();
      frameDoc.document.write('<html><head><title>&nbsp</title><style type="text/css" media="print">@page{size:  portrait; margin: 20mm 3mm 0mm 3mm; }html{ margin: 20px 3px 0px 3px;}body{margin: 0mm 5mm 0mm 5mm; }</style>');
  
      frameDoc.document.write('</head><body>');
      frameDoc.document.write(contents);
      frameDoc.document.write('</body></html>');
      frameDoc.document.close();
      setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
      }, 500);
      return false;
    };
    $scope.excel = function () {
      $rootScope.checkLogout();
      $scope.report1 = [];
      $scope.items1 = [
        { col1: "Total of Cutomers :", col2: $scope.total_customer },
        { col1: "Total of nights :", col2: $scope.total_night },
        { col1: "Total Revenue:", col2: $scope.total_revenue }
      ];
      var temp = {};
      if ($scope.pdf_list.length !== 0) {
        for (var i = 0; i < $scope.pdf_list.length; i++) {
          temp = {
            "NO": "",
            "ROOM_NAME": "",
            "NUMBER_OF_CUSTOMER": "",
            "NIGHTS": "",
            "REVENUE": "",
          };
          temp.NO = $scope.pdf_list[i].stt;
          temp.ROOM_NAME = $scope.pdf_list[i].room_name;
          temp.NUMBER_OF_CUSTOMER = $scope.pdf_list[i].customers;
          temp.NIGHTS = $scope.pdf_list[i].night;
          temp.REVENUE = $scope.pdf_list[i].grand_total;
          $scope.report1.push(temp);
        }
        for (var i = 0; i < $scope.items1.length; i++) {
          var temp = {
            "NO": "",
            "BOOKING": "",
          };
          temp.NO = $scope.items1[i].col1;
          temp.ROOM_NAME = $scope.items1[i].col2;
          $scope.report1.push(temp);
        }
      } else {
        Notify("Don't have data to export", 'top-right', '5000', 'yellow', 'fa-check', true);
        return;
      }
      var opts = [{
        sheetid: 'ROOM REPORT',
        header: true
      }];
      var res = alasql('SELECT INTO xlsx("room_report.xlsx",?) FROM ?',
        [opts, [$scope.report1]]);
    };
  };
  
 