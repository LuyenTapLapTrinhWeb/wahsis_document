function generate_house_number_and_coordinates_controller($filter, $scope, $rootScope, $http, API_URL, $timeout, $uibModal, ApartmentService, UtilityCheckFormatService, UtilityService, $resource, DTOptionsBuilder) {
    $scope.checkLogout();
    var ctrl = this;
    $rootScope.main_user_guid_userguid_id_show_popup = "pms_setting_general_generate_house_number_and_coordinates";
    $rootScope.main_user_guid_module_id_show_popup = "pms";
    $rootScope.Is_Menu = 'setting';
    $rootScope.ShowLeftMenu($rootScope.main_menu, 'setting')
    $rootScope.color_top_menu("setting")
    $rootScope.is_load_dashboard = false
    $rootScope.is_load_project = false
    $rootScope.is_load_apartment = false
    $rootScope.is_load_hotel = false
    $rootScope.is_load_service = false
    $rootScope.is_load_profile = false
    $rootScope.is_load_notification = false
    $rootScope.is_load_report = false
    $rootScope.is_load_approvals = false
    $rootScope.is_load_setting = true
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    $scope.list_page = []
    $scope.item_per_page1 = []
    var json_value = getCookieJson("pms-dev-format");
    $scope.item_per_page = JSON.parse(json_value).item_per_page;
    $scope.item_per_page_list = JSON.parse(json_value).item_per_page_list;
    $scope.page_length = page_length;
    $scope.currentPage1 = 1;
    $scope.item_per = $scope.item_per_page_list.split(",");
    for (var j = 0; j < $scope.item_per.length; j++) {
        $scope.item_per_page1.push({
            value: $scope.item_per[j],
            text: $scope.item_per[j]
        });
    };
    $scope.company = {
        company_id: com_id
    };
    $scope.page = {
        page_index: 1,
        page_size: $scope.item_per_page
    }
    $scope.dtOptions = DTOptionsBuilder.newOptions().withButtons(['copy', 'pdf', 'excel']).withDOM('<"html5buttons"B>lTtipr')
    $scope.selected = [];
    $scope.tableLocation = "locations";
    $scope.translation = translation;
    $scope.languageTemp = { language_id: $scope.translation };
    UtilityService.decentralization("pms_setting_general_generate_house_number_and_coordinates").then(function (response) {
        if (response.data.err === 0 && response.data.dt !== undefined) {
            $scope.allow = utility.get_allow(response.data);
            if (response.data.dt.permission_list.length > 0) {
                $scope.room_addresss_click = function (id, item) {
                    $("tr").removeClass("clicked");
                    $("#room_addresss_" + id).addClass("clicked");
                    $scope.selected = [];
                    $scope.selected.push(item);
                };
                if (response.data.dt.permission_list[0].allow_edit === true) {
                    $scope.room_addresss_dbclick = function (id, item) {
                        $rootScope.checkLogout()
                        $scope.selected = [];
                        $scope.selected.push(item);
                        openPopup($scope.room_addresss, $scope.selected[0]);
                    };
                }

                $rootScope.total_house_number_list = [];
            } else {
                $scope.kiemtra = "none";
            }
        } else {
            $scope.kiemtra = "none";
        }
    });

    $scope.add = function () {
        $rootScope.checkLogout()
        var modalInstance = $uibModal.open({
            templateUrl: 'setting/generate_house_number_and_coordinates/generate_house_number_and_coordinates.new.html',
            controller: crud_generate_house_number_and_coordinates_controller,
            windowClass: "animated fadeInDown",
            backdrop: "static",
            draggable: true,
            size: 'lg',
            locked: true,
            resolve: {
                grid: function () {
                    return [];
                },
                item: function () {
                    return { room_address_id: 0 };
                },
            }
        }).result.then(function () {
            $scope.selected = [];
        });
    };

    function openPopup(grid, ser) {
        var room_addresss = response.data.dt.room_addresss
        var modalInstance = $uibModal.open({
            templateUrl: 'setting/generate_house_number_and_coordinates/generate_house_number_and_coordinates.new.html',
            controller: crud_generate_house_number_and_coordinates_controller,
            windowClass: "animated fadeInDown",
            backdrop: "static",
            draggable: true,
            size: 'lg',
            locked: true,
            resolve: {
                grid: function () {
                    return grid;
                },
                item: function () {
                    return room_addresss[0];
                },
            }
        }).result.then(function () {
            $scope.selected = [];
        });
    }
}