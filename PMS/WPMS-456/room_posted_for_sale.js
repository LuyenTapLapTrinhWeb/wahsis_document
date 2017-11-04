http://team.wahsis.net/browse/WPMS-456
Đăng bán căn hộ
room_posted_for_sale
Due:	31/Oct/17
Created:	2 days ago
Updated:	Yesterday
today:281017
https://github.com/LuyenTapLapTrinhWeb/wahsis_document.git

Lấy danh sách chủ hộ cho thuê hoặc đăng bán
http://pms-dev.wahsis.net/api/
owners?cm=list_owners_by_room_id&dt={"rooms":{"room_id":9},"company":{"company_id":40743}}

Lay thông tin địa chỉ công ty
http://dev.wahsis.net/api/company?cm=detail&dt={"company":{"company_id":40743}}

cau api search
http://pms-dev.wahsis.net/api/room_posted_for_sale?cm=search&dt={
"company":{"company_id":40743},
"room_posted_for_sale":{
"status":-1,
"room_id":0,
"room_type_id":0,
"owner_name":"",
"cell_phone":"",
"acreage":0,
"to_acreage":0,
"total_amount":0,
"to_total_amount":0,
"created_date":"",
"to_date":"2017-11-11",
"description":"",
"remark":""},
"page":{"page_size":"100","page_index":1},
"languages":{"language_id":"vi"}}

http://pms-dev.wahsis.net/api/room_posted_for_sale?cm=add&dt={"room_posted_for_sale":{"status":1}}
http://pms-dev.wahsis.net/api/room_posted_for_sale?cm=update&dt={"room_posted_for_sale":{"room_posted_for_sale_id":1,"status":1}}
http://pms-dev.wahsis.net/api/room_posted_for_sale?cm=delete&dt={"room_posted_for_sale":{"room_posted_for_sale_id":1}}


API TEST ADD
http://pms-dev.wahsis.net/api/room_posted_for_sale?cm=add&dt={%22room_posted_for_sale%22:{%22room_posted_for_sale_id%22:0,%22room_id%22:10285,%22room_name%22:%22C.16.03%22,%22room_type_id%22:1,%22view_id%22:%22oceanview%22,%22view_name%22:%22H%C6%B0%E1%BB%9Bng%20bi%E1%BB%83n%22,%22location_id%22:40,%22owner_id%22:%2210229%22,%22owner_name%22:%22SOK%20KIM%20THANH%22,%22phone%22:%22841632988576%22,%22email%22:%22thanhsk1991@gmail.com%22,%22contact_name%22:%22SOK%20KIM%20THANH%22,%22contact_email%22:%22thanhsk1991@gmail.com%22,%22contact_phone%22:%22841632988576%22,%22address%22:%22L%E1%BA%A7u%2011%20Cao%20%E1%BB%91c%20Sailing,%20s%E1%BB%91%20111A%20Pasteur,%20Ph%C6%B0%E1%BB%9Dng%20B%E1%BA%BFn%20Ngh%C3%A9,%20Qu%E1%BA%ADn%201,%20TP%20HCM%22,%22description%22:%22,.,.,.,.%22,%22remark%22:%22.....,,.,.%22,%22acreage%22:100,%22longitude%22:106.746371903055,%22latitude%22:10.7785183915669,%22total_amount%22:111111111,%22status%22:1,%22created_by_id%22:0,%22created_by_name%22:%22admin%22,%22created_date%22:%222017-11-02%22},%22company%22:{%22company_id%22:40743}}
{"err":0,"msg":"No error","dt":{"room_posted_for_sale":{"room_posted_for_sale_id":20,"room_id":10285,"room_type_id":1,"room_name":"C.16.03","room_type_name":"","view_id":"oceanview","view_name":"Hướng biển","location_id":40,"location_name":"","owner_id":10229,"owner_name":"SOK KIM THANH","contact_name":"SOK KIM THANH","contact_phone":"841632988576","contact_email":"thanhsk1991@gmail.com","acreage":100.0,"amount":0.0,"total_amount":1.11111111E8,"longitude":106.746371903055,"latitude":10.7785183915669,"address":"Lầu 11 Cao ốc Sailing, số 111A Pasteur, Phường Bến Nghé, Quận 1, TP HCM","description":",.,.,.,.","remark":".....,,.,.","created_by_id":0,"created_by_name":"admin","created_date":"2017-11-02","status":1,"number_of_request":0}}}
API DETAIL
http://pms-dev.wahsis.net/api/room_posted_for_sale?cm=detail&dt={%22room_posted_for_sale%22:{%22room_posted_for_sale_id%22:20},%22languages%22:{%22language_id%22:%22vi%22},%22company%22:{%22company_id%22:40743}}