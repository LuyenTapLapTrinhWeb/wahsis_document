`udpate map address
e6c4151	
update hiển thị địa chỉ
7107de8	
update tìm tọa độ từng field
30a4ded	
update translate thông báo tìm tọa độ
f1ca9aa	
chỉnh sửa giao diện cho giống dev.wahsis.net
9a0d557	update thao tác click chọn hiện thông báo`

    `Làm API ADD EDIT

field name	data type	description
longitude	float	 
latitude	float	 
country_id	 	 
state_province_id	 	 
city_dictrict_id	 	 
wards_id	 	 
building_id	 	 
name_address	 	 
company_name 	nvarchar(128)	`

    `9792c12	1. Sửa lại vị trí tab Địa chỉ
b273c5e	2. Area => dịch lại tiếng việt là Khu vực
5bd7760	=> Load API như trang dev.wahsis.net
302418c	Thêm 1 trường Doanh nghiệp/Company sau trường Building : input dạng text area.
d97f873	
update thông báo chưa chọn tầng trước khi lưu
18aca61	
update bindings apartment: '<'
0a854da	
update thông báo tích hợp fast
a212b22	
update kiểm tra update rooms api
4731443	update zoom level
14aabfa	update thông báo lỗi
1072b4a	
update search theo building list
dcdcc7e	update kinh do vi do
1623952	update kinh do vi độ
8f866ba	
update setCenter ngchange Longitude Latitude
c6b6a05	
update ưu tiên đơn vị tọa độ lớn dần.`

    `aed1e9c	Đổi tên:Tiếng việt: Doanh nghiệpTiếng anh: Company
Đổi tên field:Tiềng việt: Tòa nhà Tiếng anh: Building
248c02a	Địa chỉ: Người dùng nhập như thế nào thì giữ nguyên bản, không tự thay đổi.
0a208a6	Bỏ dấu * màu đỏ.
be581dd	Bản đồ hiển thị mặc định là ở Hồ Chí Minh.
a0e3917	Bản đồ hiển thị mặc định là ở Hồ Chí Minh.`

/* Bước 1: insert ng-map.min.js */
/* bước 2: tạo key */
/* bước 3: điều khiển tọa độ */
/* bước 4: điều khiển zoom */
/* bước 5: thay đổi location */