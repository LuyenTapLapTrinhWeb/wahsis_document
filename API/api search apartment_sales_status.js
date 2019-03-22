http: //pms-dev.wahsis.net/api/apartment_sales_status?cm=search&dt={
  "apartment_sales_status": {
    "apartment_sales_marketing_id": 1,
    "owner_name": "Senturia Vườn Lài | DO2 |DO2-06",
    "booking_code": "",
    "request_status": 1
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
    "page_index": "1",
    "page_size": "100"
  }
}
Request URL: http://pms-dev.wahsis.net/api/apartment_sales_status?
Request Method: POST
Status Code: 200 OK
Remote Address: 125.212.211.168:80
Referrer Policy: no-referrer-when-downgrade
cm: search
dt: {"apartment_sales_status":{"apartment_sales_marketing_id":1,"owner_name":"Senturia Vườn Lài | DO2 |DO2-06","booking_code":"","request_status":1},"rooms":{"room_type_id":"1"},"company":{"company_id":54744},"languages":{"language_id":"vi"},"page":{"page_index":"1","page_size":"100"}}

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
                        "booking_code": utility.getString(reservation_repair_to_save.event_booking_code),
                        "request_status": utility.getNumber(reservation_repair_to_save.request_status)
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
                    reservation_repair_to_save.addApartmentSalesStatus(reservation_repair_to_save);
                } else {
                    swal({ title: $filter("translate")("ERROR"), text: $filter("translate")("RESPONSE_BOOKING_LIST_SEARCH_ERROR"), timer: 2000, type: "error" });
                }
            } else if (response_booking_list_search.data.err === -1) {
                swal({ title: $filter("translate")("ERROR"), text: $filter("translate")("RESPONSE_BOOKING_LIST_SEARCH_ERROR"), timer: 2000, type: "error" });
            } else {
                swal({ title: $filter("translate")("ERROR"), text: $filter("translate")("RESPONSE_BOOKING_LIST_SEARCH_ERROR"), timer: 2000, type: "error" });
            }
        })
    }
}