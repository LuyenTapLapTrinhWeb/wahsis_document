$scope.get_api_autocomplete_pms_customer = function (type) {
    $scope.apartment_sales_client_list = [];
    $scope.pms_filter_customer_info_list = [];
    //autocomplete  
    function get_info_by_type_first_name(type) { if (type === "first_name") { return utility.getString($scope.reservation.owner_name) } else { return "" }; }
    function get_info_by_type_last_name(type) { if (type === "last_name") { return utility.getString($scope.reservation.owner_last_name) } else { return "" }; }
    function get_info_by_type_cell_phone(type) { if (type === "cell_phone") { return utility.getString($scope.reservation.owner_phone) } else { return "" }; }
    function get_info_by_type_email_address(type) { if (type === "email_address") { return utility.getString($scope.reservation.owner_email) } else { return "" }; }
    let dt = {
        "apartment_sales_client": {
            "first_name": get_info_by_type_first_name(type),
            "last_name": get_info_by_type_last_name(type),
            "cell_phone": get_info_by_type_cell_phone(type), "zip_code": "",
            "email_address": get_info_by_type_email_address(type), "source_id": "", "country_id": "", "hobby": "", "remark": "", "salary": "", "sex": 0, "created_by": 0, "create_by_id": -1, "age_from": 0, "age_to": 100
        }, "company": { "company_id": com_id }, "languages": { "language_id": language }, "page": { "page_index": 1, "page_size": 100 }
    };
    dt = JSON.stringify(dt);
    UtilityService.getListObjectWithParam("apartment_sales_client", 'list', dt).success(function (response) {
        if (response.err === 0) {
            let apartment_sales_client_list = response.dt.apartment_sales_client_list;
            $scope.pms_filter_customer_info_list = get_pms_filter_customer_info_list(apartment_sales_client_list);
            autocomplete($scope.pms_filter_customer_info_list);
            function get_filter_list_info_customer_by_input_value_type(type, pms_filter_customer_info) {
                let search_info_by_input_value = "";
                if (type === "first_name") {
                    search_info_by_input_value = pms_filter_customer_info.first_name;
                } else if (type === "last_name") {
                    search_info_by_input_value = pms_filter_customer_info.last_name;
                } else if (type === "cell_phone") {
                    search_info_by_input_value = pms_filter_customer_info.cell_phone;
                } else if (type === "email_address") {
                    search_info_by_input_value = pms_filter_customer_info.email_address;
                } else {
                    /* SEARCH ALL*/
                    search_info_by_input_value = "";
                }
                return search_info_by_input_value
            }
            function get_pms_filter_customer_info_list(apartment_sales_client_list) {
                let pms_filter_customer_info_list = [];
                for (var i = 0; i < apartment_sales_client_list.length; i++) {
                    let pms_filter_customer_info = apartment_sales_client_list[i];

                    var temp = {
                        id: utility.getString(pms_filter_customer_info.apartment_sales_client_id),
                        value: get_filter_list_info_customer_by_input_value_type(type, pms_filter_customer_info),
                        first_name: utility.getString(pms_filter_customer_info.first_name),
                        last_name: utility.getString(pms_filter_customer_info.last_name),
                        identity_number: utility.getString(pms_filter_customer_info.identity_number),
                        owner_phone: utility.getString(pms_filter_customer_info.cell_phone),
                        owner_email: utility.getString(pms_filter_customer_info.email_address),
                        address_contact: utility.getString(pms_filter_customer_info.address),
                    };

                    pms_filter_customer_info_list.push(temp);
                }
                //fix cai bug sap xep theo mot cot trong json array
                pms_filter_customer_info_list.sort(function (a, b) {
                    return Number(a.id) - Number(b.id);
                });
                return pms_filter_customer_info_list;
            }
            function autocomplete(source) {
                $scope.source = source;
                if (type === "first_name") {
                    apply_auto_complete_by_id_field_input("#reservation_first_name", $scope.source);
                } else if (type === "last_name") {
                    apply_auto_complete_by_id_field_input("#reservation_last_name", $scope.source);

                } else if (type === "cell_phone") {
                    apply_auto_complete_by_id_field_input("#reservation_owner_phone", $scope.source);

                } else if (type === "email_address") {
                    apply_auto_complete_by_id_field_input("#reservation_owner_email", $scope.source);
                }
                function render_table() {
                    $.ui.autocomplete.prototype._renderMenu = function (ul, items) {
                        var self = this;
                        $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('scrollY', 300).withOption('scrollX', true);
                        $scope.page_length = page_length;
                        // table definitions
                        ul.append(
                            "<div class='col-md-12' style='overflow-x: auto'>"
                            + "<div class='table-responsive' style='overflow-x: inherit;'>"
                            + "<table data-page-length='{{" + $scope.page_length + "}}' datatable='ng' dt-options='" + $scope.dtOptions + "' class='table table - striped table - bordered table - hover'>"
                            + "<thead><tr>"
                            + "<th style='white-space: nowrap;'>" + $filter('translate')('FIRST_NAME') + "</th>"
                            + "<th style='white-space: nowrap;'>" + $filter('translate')('LAST_NAME') + "</th>"
                            + "<th style='white-space: nowrap;'>" + $filter('translate')('IDENTITY_NUMBER_CONTRACT_UNIT') + "</th>"
                            + "<th style='white-space: nowrap;'>" + $filter('translate')('PHONE_NUMBER') + "</th>"
                            + "<th style='white-space: nowrap;'>" + $filter('translate')('EMAIL_ADDRESS') + "</th>"
                            // + "<th style='white-space: nowrap;'>" + $filter('translate')('ADDRESS') + "</th>"
                            + "</tr></thead><tbody></tbody></table></div></div>"
                        );
                        $.each(items, function (index, item) {
                            self._renderItemData(ul, ul.find("table tbody"), item);
                        });
                    };
                }
                function render_item_of_table() {
                    $.ui.autocomplete.prototype._renderItemData = function (ul, table, item) {
                        return this._renderItem(table, item).data("ui-autocomplete-item", item);
                    };
                    $.ui.autocomplete.prototype._renderItem = function (table, item) {
                        return $("<tr class='ui-menu-item' role='presentation'></tr>")
                            .data("item.autocomplete", item)
                            .append("<td style='white-space: nowrap;'>" + item.first_name + "</td>"
                                + "<td style='white-space: nowrap;'>" + item.last_name + "</td>"
                                + "<td style='white-space: nowrap;'>" + item.identity_number + "</td>"
                                + "<td style='white-space: nowrap;'>" + item.owner_phone + "</td>"
                                + "<td style='white-space: nowrap;'>" + item.owner_email + "</td>"
                                //+ "<td>" + item.address_contact + "</td>"
                            )
                            .appendTo(table);
                    };
                }
                function apply_auto_complete_by_id_field_input(id_field_input, source) {
                    render_table()
                    render_item_of_table();
                    $(id_field_input).autocomplete({
                        minLength: 1,
                        source: source,
                        focus: function (event, ui) {
                            if (ui.item !== undefined) {
                                $scope.cap_nhat_customer(ui.item);
                            }
                            return false;
                        },
                        select: function (event, ui) {
                            if (ui.item !== undefined) {
                                $scope.cap_nhat_customer(ui.item);
                            }
                            return false;
                        }
                    });
                }
            }
        }
        if (response.err === 403) {
            $rootScope.logout();
        }
    });
    $scope.cap_nhat_customer = function (pms_customer) {
        $scope.reservation.owner_id = pms_customer.id;
        $scope.reservation.owner_name = pms_customer.first_name;
        $scope.reservation.owner_last_name = pms_customer.last_name;
        if (pms_customer.owner_phone) {
            $scope.reservation.owner_phone = hien_thi_so_phone_khi_update(pms_customer.owner_phone, $scope.deposit.owner_area_code);
        }
        $scope.reservation.address_contact = pms_customer.address_contact;
        $scope.reservation.owner_email = pms_customer.owner_email;
        $scope.reservation.identity_number = pms_customer.identity_number;
        $scope.$apply();
    };
}