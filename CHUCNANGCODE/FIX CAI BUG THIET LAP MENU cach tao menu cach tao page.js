-- -- --parent id
/* cách chọn parent_id của function list resource */
/* chọn parent_id là 'báo cáo' khi thêm (left menu) vào báo cáo không phân biệt left menu cha là 'dự án' */

-- -- - key - resouce id
pms_setting_log_database_pms_web
    ===
    === === === === === === === === === === === === === ==
    -- -- - config.js
    -- -- - state cha /**top menu*/
    .state("notifications_logdbpmsweb", {
        abstract: true,
        url: "/noti_logdb",
        templateUrl: "views/common/content.html"
    })
    -- -- - state con /**top menu.left menu*/
    .state("notifications_logdbpmsweb.log_database_pms_web", {
            url: "/log_database_pms_web",
            templateUrl: "setting/notification/log_database_pms_web/log_database_pms_web.view.html",
            data: { pageTitle: "Log Database PMS Web" },
            resolve: {}
        } ===
        === === === === === === === === === === === === === ==
        -- -- - index.html <
        script src = "setting/notification/log_database_pms_web/log_database_pms_web.controller.js" > < /script> ===
        === === === === === === === === === === === === === ==

        ===
        === === === === === === === === === === === === === ==
        -- -- - log_database_pms_web.view.html <
        div id = "language_translation"
        ng - controller = "log_database_pms_web_ctrl" >
        ===
        === === === === === === === === === === === === === ==

        -- -- - controller.js
        /**FIX CÁI BUG TẠO MENU LEFT + SUBMENU */
        function createArrayLeftMenuNotificationLogdbpmsweb() {
            return [{
                id: "pms_setting_log_database_pms_web",
                value: $rootScope.loadmenu("pms_setting_log_database_pms_web"),
                link: "/#/noti_logdb/log_database_pms_web",
                user_guid_id: "pms_setting_log_database_pms_web",
                module_id: "pms"
            }];
        }
        $rootScope.sub_menu_notification_logdbpmsweb = createArrayLeftMenuNotificationLogdbpmsweb(); $rootScope.left_menu_notification = [{
            id: "log_database_pms_web",
            sub_menu: $rootScope.sub_menu_notification_logdbpmsweb,
            value: getDefaultPermission(
                $rootScope.sub_menu_notification_logdbpmsweb
            ),
            link: getDefaultLink(
                $rootScope.sub_menu_notification_logdbpmsweb
            ),
            user_guid_id: getDefaultuser_guid_id(
                $rootScope.sub_menu_notification_logdbpmsweb
            ),
            module_id: getDefaultmodule_id(
                $rootScope.sub_menu_notification_logdbpmsweb
            )
        }]; ===
        === === === === === === === === === === === === === ==
        -- -- - navigation.html
        <!-- /**
        Ghi chú:
        MAIN_MENU = notification = TOP MENU Đã đăng ký trong file config MAIN_SUB_MENU = STATE CHA = notifications_logdbpmsweb = LEFT MENU Đã đăng ký trong file config SUB_MENU = STATE cha(.) STATE CON = ui - sref = "notifications_logdbpmsweb.log_database_pms_web" = SUB MENU Đã đăng ký trong file config MAIN_MENU_ID = showMainSubmenu(main_menu, 'notification', 'log_database_pms_web') showMainSubmenu = function(main_menu, id, sub_id) SUB_MENU_ID = showSubmenu(main_menu, 'notification', 'log_database_pms_web', 'pms_setting_log_database_pms_web') showSubmenu = function(main_menu, id, sub_id, child_id) MODULE_ID = pms Không đổi được phải xóa đi tạo lại vì vậy cần viết chính xác module_id RESOURCE_ID = pms_setting_log_database_pms_web **
        / --> <
        li ng -
        if = "main_menu[0].is_show && showMainSubmenu(main_menu, 'top_menu_dashboard', 'left_menu_dashboard')"
        ng - class = "{active: $state.includes('state_cha_dashboard')}" >
        <
        a href = "" >
        <
        i class = "widthIcon fa fa-clock-o" > < /i> <
        span class = "nav-label menu_parent" > {
            { "GENERAL" | translate } } < /span> <
        span class = "fa arrow" > < /span> <
        /a> <
        ul class = "nav nav-second-level collapse"
        ng - class = "{in: $state.includes('state_cha_dashboard')}" >
        <
        li ui - sref - active = "active"
        ng -
        if = "showSubmenu(main_menu, 'top_menu_dashboard', 'left_menu_dashboard', 'sub_menu_dashboard')" >
        <
        a ui - sref = "state_cha_dashboard.state_con_dashboard"
        ng - click = "capnhat_id_user_guide('pms_dashboard_total_value','sms')" >
        <
        i class = "widthIcon fa fa-clock-o"
        aria - hidden = "true" > < /i> <
        span class = "nav-label" > {
            { "TOTAL_VALUE" | translate } } < /span> <
        /a> <
        /li> <
        /ul> <
        /li> ===
        === === === === === === === === === === === === === ===
        /* Điều hướng top menu */
        $rootScope.Is_Menu = 'project'; $rootScope.ShowLeftMenu($rootScope.main_menu, 'project') $rootScope.color_top_menu("project") $rootScope.is_load_dashboard = false $rootScope.is_load_project = true $rootScope.is_load_apartment = false $rootScope.is_load_hotel = false $rootScope.is_load_service = false $rootScope.is_load_profile = false $rootScope.is_load_notification = false $rootScope.is_load_report = false $rootScope.is_load_approvals = false $rootScope.is_load_setting = false ===
        === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
        ===
        === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
        ===
        === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
        /** *KHÔNG CLICK ĐƯỢC TOP MENU */
        /* chú ý cách fix tất cả các loại bug menu trong các trường hợp sau */
        /* 1 là bị click vô menu không được do parent_node_top_menu(parent_state) được khai báo nhưng child_node lại không tuân theo */
        -- -- - state cha xét lại url /**top menu*/
        .state("notifications_logdbpmsweb", {
            abstract: true,
            url: "/noti_logdb",
            templateUrl: "views/common/content.html"
        })
        -- -- - state con xét lại url /**top menu.left menu*/
        .state("notifications_logdbpmsweb.log_database_pms_web", {
                url: "/log_database_pms_web",
                templateUrl: "setting/notification/log_database_pms_web/log_database_pms_web.view.html",
                data: { pageTitle: "Log Database PMS Web" },
                resolve: {}
            }

            function createArrayLeftMenuNotificationLogdbpmsweb() {
                let parent_node_top_menu = "/#/noti_logdb/";
                let child_sub_left_menu_list = [];
                child_sub_left_menu_list = [{
                    id: "pms_setting_log_database_pms_web",
                    value: $rootScope.loadmenu("pms_setting_log_database_pms_web"),
                    link: parent_node_top_menu + "log_database_pms_web",
                    user_guid_id: "pms_setting_log_database_pms_web",
                    module_id: "pms"
                }];
                return child_sub_left_menu_list;
            } ===
            === === === === === === === === === === === ===
            // Bước cuối cùng
            /* login phân quyền cho 2 resouce */
            /* thiết lập> phân quyền> phân quyền> tìm resource name > check all> save*/