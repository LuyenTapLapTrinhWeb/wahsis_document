/* [API] Search nhân viên kinh doanh theo khách hàng từ bảng apartment_sales_client_assign */
http://pms-dev.wahsis.net/api/apartment_sales_client_assign?cm=search&dt={"apartment_sales_client_assign":

{ "apartment_sales_client_id": 42485 }
, "company":

{ "company_id": 54744 }
, "languages":

{ "language_id": "vi" }
, "page":

{ "page_index": 1, "page_size": "100" }
}
let apartment_sales_client_assign = {
    search_sales_staff_according_to_customers: function (apartment_sales_client_id) {
        let request_url = {
            table: "apartment_sales_client_assign",
            cm: "search",
            dt: JSON.stringify({
                "apartment_sales_client_assign": { "apartment_sales_client_id": apartment_sales_client_id },
                "company": { "company_id": com_id },
                "languages": { "language_id": language },
                "page": { "page_index": 1, "page_size": "100" }
            }),
        }
        UtilityService.getListObjectWithParam(request_url.table, request_url.cm, request_url.dt).SUCCESS(function (response) {
            let TRANG_THAI_RESPONSE = {
                "SUCCESS": response.err === 0,
                "ERROR": response.err === -1,
                "DUPLICATED": response.err === -2,
            }
            if (TRANG_THAI_RESPONSE.SUCCESS) {
                $scope.apartment_sales_client_assign_list = response.dt.apartment_sales_client_assign_list
            } else if (TRANG_THAI_RESPONSE.DUPLICATED) {
                $scope.apartment_sales_client_assign_list = response.dt.apartment_sales_client_assign_list
                swal({ title: $filter("translate")("ERROR"), text: response.err + ":" + response.msg, timer: 2000, type: "error" });
            } else if (TRANG_THAI_RESPONSE.ERROR) {
                throw new Error("Truyền sai định dạng khi tổng hợp [API] Search nhân viên kinh doanh theo khách hàng từ bảng apartment_sales_client_assign");
            } else {
                swal({ title: $filter("translate")("ERROR"), text: $filter("translate")("ERROR"), timer: 2000, type: "error" });
            }
        })
    }
}
