http: //localhost: 8015/api/apartment_sales_status?cm=search&dt={
"apartment_sales_status": {
    "apartment_sales_marketing_id": "1",
        "owner_name": "Senturia Vườn Lài | DO1 |DO1-01",
            "booking_code": "0001"
},
"rooms": {
    "room_type_id": "1"
},
"company": {
    "company_id": 54744
},
"languages": {
    "language_id": "vi"
},
"page": {
    "page_index": 1,
        "page_size": "100"
}
}
/* json tra ve */
{
    "err": 0,
        "msg": "No error",
            "dt": {
        "apartment_sales_status_list": [
            {
                "apartment_sales_status_id": 42008,
                "apartment_sales_status_name": "Senturia Vườn Lài | DO1 |DO1-01",
                "remark": "Senturia Vườn Lài | DO1 |DO1-01",
                "effective_date": "2019-02-20 00:00:00.0",
                "start_time": "2019-02-20 15:00:00.0",
                "end_time": "2019-02-20 18:00:00.0",
                "request_status": 1,
                "status": 3,
                "created_by_id": 10,
                "created_date": "2019-02-20 06:40:47.0",
                "owner_id": 0,
                "owner_name": "Senturia Vườn Lài | DO1 |DO1-01",
                "owner_last_name": "",
                "owner_phone": "84323211221522",
                "owner_email": "",
                "address_contact": "Senturia Vườn Lài | DO1 |DO1-01",
                "owner_area_code": "84",
                "owner_nationality_id": "VN",
                "room_type_name": "Biệt thự đơn lập",
                "room_name": "DO1-01",
                "room_type_id": 1,
                "room_id": 10002,
                "source_id": 42008,
                "apartment_sales_marketing_id": 1,
                "apartment_sales_marketing_name": "",
                "agent_id": 4,
                "reservation_id": 42008,
                "apartment_sales_client_id": 41348,
                "booking_code": "0001"
            }
        ],
            "page": {
            "total_page": 1,
                "total_row": 1
        }
    }
}
/* code thuc hien */

function getBookingListSearch(reservation_repair_to_save) {
    /* http://localhost:8015/api/apartment_sales_status?cm=search&dt={"apartment_sales_status":{"apartment_sales_marketing_id":"1","owner_name":"Senturia Vườn Lài | DO1 |DO1-01","booking_code":"0001"},"rooms":{"room_type_id":"1"},"company":{"company_id":54744},"languages":{"language_id":"vi"},"page":{"page_index":1,"page_size":"100"}} */
    if (reservation_repair_to_save) {
        let request_url = {
            table: "apartment_sales_status",
            cm: "search",
            dt: JSON.stringify(
                {
                    "apartment_sales_status": {
                        "apartment_sales_marketing_id": utility.getNumber(reservation_repair_to_save.apartment_sales_marketing_id),
                        "owner_name": utility.getString(reservation_repair_to_save.owner_name),
                        "booking_code": utility.getString(reservation_repair_to_save.event_booking_code)
                    },
                    "rooms": { "room_type_id": "1" },
                    "company": { "company_id": com_id },
                    "languages": { "language_id": language },
                    "page": { "page_index": "1", "page_size": "100" }
                }
            )
        }
        UtilityService.getListObjectWithParam(request_url.table, request_url.cm, request_url.dt).then(function (response_booking_list_search) {
            if (response_booking_list_search.data.err === 0) {
                if (response_booking_list_search.data.dt.apartment_sales_status_list) {
                    $scope.apartment_sales_status_list = response_booking_list_search.data.dt.apartment_sales_status_list;
                    reservation_repair_to_save.apartment_sales_status_list = response_booking_list_search.data.dt.apartment_sales_status_list;
                    let addApartmentSalesStatus = reservation_repair_to_save.addApartmentSalesStatus;
                    addApartmentSalesStatus(reservation_repair_to_save);
                }
            } else if (response_booking_list_search.data.err === -1) {
                swal({ title: $filter("translate")("ERROR"), text: $filter("translate")("RESPONSE_BOOKING_LIST_SEARCH_ERROR"), timer: 2000, type: "error" });
            } else {
                swal({ title: $filter("translate")("ERROR"), text: $filter("translate")("RESPONSE_BOOKING_LIST_SEARCH_ERROR"), timer: 2000, type: "error" });
            }
        })
    }
}