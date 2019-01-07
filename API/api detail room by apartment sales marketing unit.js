function get_room_detail_by_apartment_sales_marketing_id(apartment_sales_marketing_id) {
    $scope.objectRoom = {
        room_id: $scope.item.room_id,
    };
    $scope.ObjectApartmentSalesMarketing = {
        apartment_sales_marketing_id: apartment_sales_marketing_id,
    };
    var dataRoomDetail = JSON.stringify({
        company: $scope.companyTemp,
        languages: $scope.languageTemp,
        rooms: $scope.objectRoom,
        apartment_sales_marketing_unit: $scope.ObjectApartmentSalesMarketing //Van
    });
    UtilityService.getListObjectWithParam($scope.tableRooms, "detail", dataRoomDetail).then(function (response) {
        if (response.data.err === 0) {
            $scope.roomsDetail = response.data.dt.rooms;
            let reservation_maketting = wizard_screen.man_hinh_canho.reservation_maketting
            let danh_sach_chien_dich_list = reservation_maketting.apartment_sales_marketing_list.get();
            let chien_dich_chua_ngay_hien_hanh = reservation_maketting.get_danh_sach_chien_dich_co_thoi_gian_hieu_luc_chua_ngay_hien_hanh(danh_sach_chien_dich_list);
            if ($scope.reservation_marketing_list && apartment_sales_marketing_id) {
                $scope.reservation.apartment_sales_marketing_id = apartment_sales_marketing_id;
                wizard_screen.man_hinh_canho.data_room_detail.chitiet_canho.set($scope.roomsDetail)
            }
        }
    });
}
Request URL: http://pms-dev.wahsis.net/api/rooms?
cm: detail
dt: {"company":{"company_id":54744},"languages":{"language_id":"vi"},"rooms":{"room_id":10005},"apartment_sales_marketing_unit":{"apartment_sales_marketing_id":1}}
Request Method: POST
Status Code: 200 OK
Remote Address: 125.212.211.168:80
Referrer Policy: no-referrer-when-downgrade
Provisional headers are shown
Accept: application/json, text/plain, */*
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEiLCJhaWQiOiIxMDAwMiIsImF0aSI6IjEiLCJtaWQiOiI1NDc0NCIsInVzciI6ImFnZW50QSIsInJvbCI6InN0YWZmIiwiaWF0IjoxNTQ2ODI3NjE1LCJqdGkiOiIydWZmcjJ3dzlmcjY1djIwIn0.IZni9sb98vLC3tmFY1z5ntVZuyFVwmZmO20u5dbnYg0
Content-Type: application/x-www-form-urlencoded
Origin: http://localhost:3000
Referer: http://localhost:3000/
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36