Request URL: http://pms-dev.wahsis.net/api/apartment_sales_client?
Request Method: POST
Status Code: 200 OK
Remote Address: 125.212.211.168: 80
Referrer Policy: no - referrer - when - downgrade
cm: add
dt: { "apartment_sales_client": { "first_name": "Phạm Quang Vinh", "cell_phone": "84903194529", "zip_code": "34234234", "email_address": "vinh.pham@wahsis.com", "country_id": "VN", "province_id": "79", "district_id": "DIS.0007", "company_name": "Tên công ty", "business_name": "", "position_name": "Tên chức vụ", "hobby": "Sở thích", "remark": "Ghi chú", "source_id": "SCS.0004", "source_name": "", "area_code": "84", "nationality_id": "VN", "salary": "Duoi 50 trieu", "sex": 1, "date_of_birth": "2019-03-13", "users_id": 2, "users_name": "Administrator", "create_by_id": 2, "address_contact": "Địa chỉ liên hệ", "tax_code": "34234234", "bank_account_number": "234234234", "bank_name": "Tên ngân hàng", "identity_number": "23423423", "issue_date": "2019-03-13", "issue_place": "43", "is_invesloper": 1 }, "company": { "company_id": 54744 } }
let json_viewer = {
    "apartment_sales_client": {
        address: utility.getString($scope.it.address),
        "area_code": utility.getString($scope.it.area_code1),
        "address_contact": utility.getString($scope.it.address_contact),
        business_name: utility.getString($scope.it.career_id),
        "bank_account_number": utility.getString($scope.it.bank_account_number),
        "bank_name": utility.getString($scope.it.bank_name),
        client_type: $scope.it.client_type,
        "cell_phone": utility.getString($scope.it.phone),
        company_name: utility.getString($scope.it.company_name),
        "create_by_id": utility.getNumber(u_id),
        country_id: utility.getString($scope.it.country_id),
        district_id: utility.getString($scope.it.district_id),
        "date_of_birth": utility.getString(UtilityCheckFormatService.change_date_to_save($scope.it.birthday)),
        "email_address": utility.getString($scope.it.email_address),
        "first_name": utility.getString($scope.it.first_name),
        "hobby": utility.getString($scope.it.hobby),
        "identity_number": utility.getString($scope.it.identity_number),
        "issue_date": utility.getString(UtilityCheckFormatService.change_date_to_save($scope.it.date_identity)),
        "issue_place": utility.getString($scope.it.issue_place),
        "is_invesloper": utility.getNumber($scope.it.is_invesloper),
        "is_internal": utility.getNumber($scope.it.is_internal),
        "last_name": utility.getString($scope.it.last_name),
        "nationality_id": utility.getString($scope.it.area_code),
        position_name: utility.getString($scope.it.position_name),
        province_id: utility.getString($scope.it.province_id),
        "remark": utility.getString($scope.it.remark),
        "source_id": utility.getString($scope.it.source_id),
        "source_name": utility.getString($scope.it.source_name),
        "salary": utility.getString($scope.it.salary),
        "sex": utility.getNumber($scope.it.sex),
        "tax_code": utility.getString($scope.it.tax_code),
        "users_id": utility.getNumber(u_id),
        "users_name": utility.getString(u_name),
        "zip_code": utility.getString($scope.it.zip_code),
    },
    "company": {
        "company_id": 54744
    }
}
let json_viewer = {
    "apartment_sales_client": {
        "address": utility.getString($scope.it.address),
        "area_code": utility.getString("84"),
        "address_contact": utility.getString("Địa chỉ liên hệ"),
        "business_name": utility.getString(""),
        "bank_account_number": utility.getString("234234234"),
        "bank_name": utility.getString("Tên ngân hàng"),
        "client_type": $scope.it.client_type,
        "cell_phone": utility.getString("84903194529"),
        "company_name": utility.getString("Tên công ty"),
        "create_by_id": utility.getNumber(2),
        "country_id": utility.getString("VN"),
        "district_id": utility.getString("DIS.0007"),
        "date_of_birth": utility.getString("2019-03-13"),
        "email_address": utility.getString("vinh.pham@wahsis.com"),
        "first_name": utility.getString("Phạm Quang Vinh"),
        "hobby": utility.getString("Sở thích"),
        "identity_number": utility.getString("23423423"),
        "issue_date": utility.getString("2019-03-13"),
        "issue_place": utility.getString("43"),
        "is_invesloper": utility.getNumber(1),
        "is_internal": utility.getNumber($scope.it.is_internal),
        "last_name": utility.getString($scope.it.last_name),
        "nationality_id": utility.getString("VN"),
        "position_name": utility.getString("Tên chức vụ"),
        "province_id": utility.getString("79"),
        "remark": utility.getString("Ghi chú"),
        "source_id": utility.getString("SCS.0004"),
        "source_name": utility.getString(""),
        "salary": utility.getString("Duoi 50 trieu"),
        "sex": utility.getNumber(1),
        "tax_code": utility.getString("34234234"),
        "users_id": utility.getNumber(2),
        "users_name": utility.getString("Administrator"),
        "zip_code": utility.getString("34234234"),
    },
    "company": {
        "company_id": 54744
    }
} 
var report_row = {
    "Địa chỉ thường trú":   "address" 
    "Mã vùng":   "area_code1" 
    "Địa chỉ liên hệ":   "address_contact" 
    "Nghề nghiệp":   "career_id" 
    "Số tài khoản ngân hàng":   "bank_account_number" 
    "ngân hàng":   "bank_name" 
    "Loại khách hàng":  "client_type",
    "Số điện thoại":   "phone" 
    "Tên công ty":   "company_name" 
    "Ngày Sinh":    "birthday" 
    "Địa chỉ Email":   "email_address" 
    "Họ và tên":   "first_name" 
    "Sở thích":   "hobby" 
    "Số CMND":   "identity_number" 
    "Ngày cấp":    "date_identity" 
    "Nơi cấp":   "issue_place" 
    "Là khách của chủ đầu tư": utility.getNumber( "is_invesloper" 
    "Là khách nội bộ": utility.getNumber( "is_internal" 
    "Mã quốc gia":   "area_code" 
    "Chức vụ":   "position_name" 
    "Ghi chú":   "remark" 
    "Nguồn khách hàng":   "source_name" 
    "Mức thu nhập":   "salary" 
    "Giới tính": utility.getNumber( "sex" 
    "Mã số thuế":   "tax_code" 
    "Mã bưu điện":   "zip_code" 
};