$scope.ngChangeGetZipcode = function () {
    if (utility.checkValue($scope.it.district_id)) {
        $scope.it.zip = octopus.district_list.getzipcode($scope.it.district_id);
    } else {
        $scope.it.zip = "0";
    }
}
getzipcode: (district_id) => {
    switch (district_id) {
        /* ZIP CODE */
        /* ================================================================= */
        /* ===========================HO CHI MINH=========================== */
        /* ================================================================= */
        /*  Bình chánh  709000          | Quận 1    701000
            Bình Tân    709300          | Quận 2    708300
            Bình Thạnh  704000          | Quận 3    701500
            Cần Giờ     709500          | Quận 4    702000
            Củ Chi      707000          | Quận 5    702500
            Gò Vấp      705500          | Quận 6    703000
            Hốc môn     707500          | Quận 7    708800
            Nhà Bè      708500          | Quận 8    706000
            Phú nhuận   704500          | Quận 9    708400
            Tân Bình    705000          | Quận 10   703500
            Tân Phú     705800          | Quận 11   706500
            Thủ Đức     708000          | Quận 12   707800 */
        case "DIS.0001": { return "701000" }
        case "DIS.0002": { return "708300" }
        case "DIS.0003": { return "701500" }
        case "DIS.0004": { return "702000" }
        case "DIS.0005": { return "702500" }
        case "DIS.0006": { return "703000" }
        case "DIS.0007": { return "708800" }
        case "DIS.0008": { return "706000" }
        case "DIS.0009": { return "708400" }
        case "DIS.0010": { return "703500" }
        case "DIS.0011": { return "706500" }
        case "DIS.0012": { return "707800" }
        case "DIS.0020": { return "709000" }/* Bình chánh */
        case "DIS.0019": { return "709300" }/* Bình Tân */
        case "DIS.0014": { return "704000" }/* Bình Thạnh */
        case "DIS.0024": { return "709500" }/* Cần Giờ */
        case "DIS.0021": { return "707000" }/* Củ Chi */
        case "DIS.0017": { return "727010" }/* Gò Vấp */
        case "DIS.0022": { return "707500" }/* Hốc môn  */
        case "DIS.0023": { return "708500" }/* Nhà Bè */
        case "DIS.0013": { return "704500" }/* Phú nhuận */
        case "DIS.0016": { return "705000" }/* Tân Bình */
        case "DIS.0015": { return "705800" }/* Tân Phú */
        case "DIS.0018": { return "708000" }/* Thủ Đức */
        /* ================================================================= */
        /* ==============================HA NOI============================= */
        /* ================================================================= */
        case "DIS.0041": { return "125000" }/* Long Biên */
        case "DIS.0041": { return "125000" }/* Long Biên */
        default: return 0;
    }
},