/* ====================================================================================================== */
/* ====================================================================================================== */
/* group by dai ly nhom ban by chien dich mo ban*/
/* ====================================================================================================== */
/* ====================================================================================================== */
function get_agent_list_by_apartment_sales_marketing_id(apartment_sales_marketing_commission_list, agents_list) {
    let agents_list_in_apartment_sales_marketing_commission_list = [];
    for (var x in apartment_sales_marketing_commission_list) {
        let apart_obj = apartment_sales_marketing_commission_list[x];
        for (var y in agents_list) {
            let agent_obj = agents_list[y];
            if (apart_obj.agent_id === agent_obj.agent_id) {
                if (apart_obj.agent_id === agent_obj.agent_id) {
                    agents_list_in_apartment_sales_marketing_commission_list.push(agent_obj)
                }
            }
        }
    }
    return agents_list_in_apartment_sales_marketing_commission_list;
}
/* ====================================================================================================== */
/* ====================================================================================================== */
/* dai ly, nhom ban /nguoi ban/ chien dich mo ban */
/* ====================================================================================================== */
/* ====================================================================================================== */
$scope.get_apartment_sales_marketing_commission_list = function () {
    if ($scope.reservation.apartment_sales_marketing_id) {
        $scope.sourceTemp = {
            apartment_sales_status_id: $scope.item.reservation_id
        };
        var dataCurrentStatusSource = JSON.stringify({
            company: $scope.companyTemp,
            apartment_sales_status: $scope.sourceTemp
        });
        UtilityService.getListObjectWithParam($scope.tableApartmentSaleStatus, 'detail', dataCurrentStatusSource).success(function (response) {
            if (response.err === 0) {
                let apartment_sales_status = response.dt.apartment_sales_status;
                apartment_sales_status.apartment_sales_marketing_id = $scope.reservation.apartment_sales_marketing_id;
                apartment_sales_status.room_id = $scope.item.room_id;
                let dt_agent = {
                    apartment_sales_marketing_commission: {
                        apartment_sales_marketing_id: $scope.reservation.apartment_sales_marketing_id,
                        room_id: item.room_id
                    },
                    company: { company_id: com_id },
                    page: { page_index: 1, page_size: 100 }
                }
                dt_agent = JSON.stringify(dt_agent);
                UtilityService.getListObjectWithParam("apartment_sales_marketing_commission", 'suggest_commission_agents', dt_agent).success(function (response) {
                    if (response.err === 0) {
                        let apartment_sales_marketing_commission_list = response.dt.apartment_sales_marketing_commission_list;
                        /* GET AGENT_LIST */
                        var requesturl = {
                            dailynhomban: {
                                table: "agents",
                                cm: "search",
                                dt: { "agents": { "agent_type_id": -1, "term_paid": -1 }, "company": { "company_id": com_id }, "languages": { "language_id": language }, "page": { "page_index": 1, "page_size": 10000000 } }
                            },
                            nguoiban: {
                                table: "users",
                                cm: "list_by_agent_id",
                                dt: { "agents": { "agent_id": $scope.reservation.agent_id/*show all */ }, "company": { "company_id": com_id } }
                            }
                        }
                        if (Number(account_type) === 3 || Number(account_type) === 4) {
                            if (utility.checkValue(users_id)) {
                                dt.users.users_id = users_id;
                            }
                        }
                        let cm = requesturl.dailynhomban.cm;
                        let table = requesturl.dailynhomban.table;
                        let dt = JSON.stringify(requesturl.dailynhomban.dt);
                        UtilityService.getListObjectWithParam(table, cm, dt).then(function (response) {
                            if (response.data.err === 0) {
                                $scope.agents_list = response.data.dt.agents_list;
                                $scope.agents_list = $scope.set_group_agent_list_by_agent_type_id(response.data.dt.agents_list);
                                wizard_screen.man_hinh_dangky.agent_by_users.get_agent_and_seller_by_marketing_account_two_three_four(response.data.dt.agents_list);
                                let cm = requesturl.nguoiban.cm;
                                let table = requesturl.nguoiban.table;
                                let dt = JSON.stringify(requesturl.nguoiban.dt);
                                /* GET USERS_LIST */
                                UtilityService.getListObjectWithParam(table, cm, dt).then(function (response) {
                                    if (response.data.err === 0) {
                                        $scope.list_seller_by_agent_id = response.data.dt.users_list;
                                        if (apartment_sales_marketing_commission_list.length > 0) {
                                            /* NGCHANGE Thiết lập nhân viên đại lý theo chiến dịch */
                                            $scope.agents_list = get_agent_list_by_apartment_sales_marketing_id(apartment_sales_marketing_commission_list, $scope.agents_list)
                                            if ($scope.agents_list) {
                                                if ($scope.agents_list.length > 0) {
                                                    for (var x in $scope.agents_list) {
                                                        let agentobj = $scope.agents_list[x];
                                                        if (agentobj.agent_id === $scope.reservation.agent_id) {
                                                            $scope.agent_detail.agent_id = agentobj.agent_id;
                                                            $scope.agent_detail.agent_name = agentobj.agent_name;
                                                        }
                                                    }
                                                }
                                            }
                                            if ($scope.list_seller_by_agent_id) {
                                                if ($scope.list_seller_by_agent_id.length > 0) {
                                                    for (var x in $scope.list_seller_by_agent_id) {
                                                        let sellerobj = $scope.list_seller_by_agent_id[x];
                                                        if (sellerobj.users_id === $scope.reservation.created_by_id) {
                                                            $scope.users_detail = sellerobj;
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            console.error("Căn hộ này chưa thiết lập hoa hồng đại lý hoặc nhân viên");
                                        }
                                        function check_is_event() {
                                            for (var i = 0; i <= $scope.deposit_marketing_list_search.length; i++) {
                                                var marketing_obj = $scope.deposit_marketing_list_search[i];
                                                if (marketing_obj.apartment_sales_marketing_id === $scope.reservation.apartment_sales_marketing_id) {
                                                    $scope.is_event = marketing_obj.is_event;
                                                    break;
                                                }
                                            }
                                        }
                                        check_is_event();
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } else {
        wizard_screen.man_hinh_dangky.response_reservation.set_reservation(item);
    }
}
/* ====================================================================================================== */
/* ====================================================================================================== */
/* tai khoan 2 3 4 dai ly chien dich dung tai khoan moi duoc xem chinh no va chinh sua*/
/* ====================================================================================================== */
/* ====================================================================================================== */
get: function () {
    $scope.is_agen = true;
    wizard_screen.man_hinh_dangky.agent_by_users.get(u_id);
    let dt = wizard_screen.man_hinh_dangky.agent_detail.dt;
    if (utility.checkValue($scope.reservation.agent_id)) {
        dt.agents.agent_id = $scope.reservation.agent_id;
        let cm = wizard_screen.man_hinh_dangky.agent_detail.cm;
        dt = JSON.stringify(dt);
        let get_agents_detail = function (success, dt) {
            UtilityService.getListObjectWithParam("agents", cm, dt).success(success)
        }
        let success = function (response) {
            if (response.err === 0) {
                $scope.agent_detail = response.dt.agents;
                var requesturl = {
                    dailynhomban: {
                        table: "agents",
                        cm: "search",
                        dt: { "agents": { "agent_type_id": -1, "term_paid": -1 }, "company": { "company_id": com_id }, "languages": { "language_id": language }, "page": { "page_index": 1, "page_size": 10000000 } }
                    },
                    nguoiban: {
                        table: "users",
                        cm: "list_by_agent_id",
                        dt: { "agents": { "agent_id": $scope.reservation.agent_id/*show all */ }, "company": { "company_id": com_id } }
                    }
                }
                let cm = requesturl.dailynhomban.cm;
                let table = requesturl.dailynhomban.table;
                let dt = JSON.stringify(requesturl.dailynhomban.dt);
                UtilityService.getListObjectWithParam(table, cm, dt).then(function (response) {
                    if (response.data.err === 0) {
                        $scope.agents_list = response.data.dt.agents_list;
                        $scope.agents_list = $scope.set_group_agent_list_by_agent_type_id(response.data.dt.agents_list);
                        wizard_screen.man_hinh_dangky.agent_by_users.get_agent_and_seller_by_marketing_account_two_three_four($scope.agent_detail);
                    }
                });
            }
        }
        get_agents_detail(success, dt);
    }
}