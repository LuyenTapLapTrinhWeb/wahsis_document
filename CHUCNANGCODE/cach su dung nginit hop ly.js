/* sử dụng ng init cho danh sách chọn selected khi edit */
/* bước 1: đặt ng-init cho function tạo danh sách list */
/* bước 2: trong function chia thành 2 trường hợp */
/* 1 là edit 2 là add */
/* khi edit thì gọi function $scope.ngChangeGetRoomContacts hiển thị lên selected */
/* khi add thì gọi function getRoomContactsList hiển thị lên selection */
/* getRoomContactsList hiển thị detail của chính nó và các field liên quan theo một field nào đó*/
/* $scope.ngChangeGetRoomContacts hiển thị detail field khác theo một field nào đó */
/* CODE thực hiện */
/* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* CÁCH THỨ NHẤT LÀ GỌI HÀM getRoomContactsList TRONG CONTROLLER */
/* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function getRoom() {
    UtilityService.getListObject('rooms', language).then(function (response) {
        if (response.data.err === 0) {
            $scope.rooms_list = response.data.dt.rooms_list;
            $scope.room_hienthi = response.data.dt.rooms_list;
            getRoomContactsList(item);
        }
    })
}
/* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* cài đặt hàm gọi APIListDetail khi mở popup */
function getRoomContactsList(item) {
    let request_url_rclist = {
        table: "room_contacts",
        cm: "list",
        dt: JSON.stringify({
            "room_contacts": {
                "room_id": item.room_id ? item.room_id : 0,
                "contact_name": item.contact_name ? item.contact_name : "",
                "cell_phone": item.cell_phone ? item.cell_phone : "",
            },
            "company": { company_id: com_id },
            "languages": { language_id: language },
            "page": $scope.page
        })
    }
    UtilityService.getListObjectWithParam(request_url_rclist.table, request_url_rclist.cm, request_url_rclist.dt).then(function (response) {
        if (response.data.err === 0) {
            /* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            Trả về dữ liệu detail ApI list
            `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
            $scope.room_contacts_list = response.data.dt.room_contacts_list;
            /* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            lọc detail
            `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
            if (item.room_contact_id && $scope.room_contacts_list && $scope.room_contacts_list.length > 1) {
                for (var rc_index in response.data.dt.room_contacts_list) {
                    let rc = response.data.dt.room_contacts_list[rc_index];
                    if (rc.item.room_contact_id === item.room_contact_id) {
                        $scope.item.room_contact_id = rc.item.room_contact_id;
                        $scope.item.cell_phone = rc.cell_phone;
                        break;
                    }
                }
            } else {
                /* TH: room_contact_id === 0 */
                if ($scope.room_contacts_list && $scope.room_contacts_list.length === 1) {
                    $scope.item.room_contact_id = $scope.room_contacts_list[0].room_contact_id;
                    $scope.item.cell_phone = $scope.room_contacts_list[0].cell_phone;
                } else {
                    for (var rc_index in response.data.dt.room_contacts_list) {
                        let rc = response.data.dt.room_contacts_list[rc_index];
                        if (rc.group_id === group_id && rc.model === model) {
                            $scope.item.room_contact_id = rc.item.room_contact_id;
                            $scope.item.cell_phone = rc.cell_phone;
                            break;
                        }
                    }
                }
            }
            /* 
            `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                        cài đặt hàm gọi APIListDetail liên tiếp
            `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
            getElectricLockList(item.room_id, item.lock_id, item.group_id, item.lock_name, item.model);
        } else {
            swal($filter("translate")("warning"), $filter("translate")("no_data"), "warning");
            console.error(`No data $scope.room_contacts_list${$scope.room_contacts_list} && $scope.room_contacts_list.length ${$scope.room_contacts_list.length} && room_contact_id${room_contact_id}`);
            $scope.item.contact_name = "";
            $scope.item.cell_phone = "";
            $scope.item.room_contact_id = 0;
            $scope.room_contacts_list = [];
            return;
        }
    })
}
/* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Bước 2: Sau khi load detail thì load tiếp sự thay đổi người dùng */
$scope.ngChangeGetRoomContacts = function (room_id, room_contact_id) {
    let request_url_rclist = {
        table: "room_contacts",
        cm: "list",
        dt: JSON.stringify({
            "room_contacts": {
                "room_id": room_id ? room_id : 0,
                "contact_name": "",
                "cell_phone": "",
            },
            "company": { company_id: com_id },
            "languages": { language_id: language },
            "page": $scope.page
        })
    }
    UtilityService.getListObjectWithParam(request_url_rclist.table, request_url_rclist.cm, request_url_rclist.dt).then(function (response) {
        if (response.data.err === 0) {
            $scope.room_contacts_list = response.data.dt.room_contacts_list;
            if ($scope.room_contacts_list && $scope.room_contacts_list.length) {
                if (room_contact_id) {
                    for (var rc_index in response.data.dt.room_contacts_list) {
                        let rc = $scope.room_contacts_list[rc_index];
                        if (rc.room_contact_id === room_contact_id) {
                            $scope.item.contact_name = rc.contact_name;
                            $scope.item.cell_phone = rc.cell_phone;
                            $scope.item.room_contact_id = rc.room_contact_id;
                            break;
                        }
                    }
                } else {
                    /* chọn lại room_contact_id reset cell_phone */
                    $scope.room_contact_id = 0;
                    $scope.cell_phone = "";
                    console.error(`No data $scope.room_contact_id${$scope.room_contact_id}`);
                    return;
                }
            } else {
                /* chọn lại room_contact_id reset cell_phone */
                $scope.room_contact_id = 0;
                $scope.cell_phone = "";
                $scope.room_contacts_list = [];
                console.error(`No data $scope.room_contacts_list${$scope.room_contacts_list} && $scope.room_contacts_list.length${$scope.room_contacts_list.length}`);
                return;
            }
        } else {
            swal($filter("translate")("warning"), $filter("translate")("no_data"), "warning");
            console.error(`No data $scope.room_contacts_list${$scope.room_contacts_list} && $scope.room_contacts_list.length ${$scope.room_contacts_list.length} && room_contact_id${room_contact_id}`);
            $scope.item.contact_name = "";
            $scope.item.cell_phone = "";
            $scope.item.room_contact_id = 0;
            $scope.room_contacts_list = [];
            return;
        }
    })
}
    /* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* CÁCH THỨ 2: GỌI HÀM $scope.ngChangeGetRoomContacts Ở HTML bằng ng-init='$scope.ngChangeGetRoomContacts()'*/
    /* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    khi gọi ng-change thì thay đổi thông tin của room_contact_id theo room_id */
    ` <select chosen id="states" class="chosen-select room_name"
ng-model="item.room_id" ng-required="false"
ng-change="change_room(item.room_id, item.room_contact_id)"
ng-options="obj.room_id as obj.name for obj in room_hienthi">
<option value="" disabled>{{"ALL"|translate}}</option>
<option disabled></option>
</select>
`
    /* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Khi Thay đổi room_contact_id thì thay đổi cell_phone của room_contact_id */
    `<select chosen id="states" ng-model="item.room_contact_id"
ng-change="ngChangeGetRoomContacts(item.room_id, item.room_contact_id)"
ng-options="obj.room_contact_id as obj.contact_name for obj in room_contacts_list"
ng-disabled="!room_contacts_list.length" ng-required="false">
<option value="" disabled>{{"ALL"|translate}}</option>
<option disabled></option>
</select>`
    /* `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    cell_phone */
    ` <input type="text" class="form-control" required="false"
ng-model="item.cell_phone"
ng-attr-placeholder="{{'CHOOSE_ROOM_CONTACT_FIRST'|translate}}" disabled>
</div>`
