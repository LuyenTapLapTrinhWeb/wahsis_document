/**
 * [WPMS-495] TẠO DANH SÁCH CHỨC NĂNG VÀ HƯỚNG DẪN SỬ DỤNG 
 * CREATED: 17/NOV/17  UPDATED: 17/NOV/17  DUE: 20/NOV/17 
 */
    dev.wahsis.net/api/user_guid?cm=search&dt={
    "user_guid":{"user_guid_id":"", "module_id":"","model":"","top_memu":"","left_memu":"","sub_memu":""},"page":{"page_index":1,"page_size":100}, "languages":{"language_id":"vi"}
    }
    
    dev.wahsis.net/api/user_guid?cm=detail&dt={
    "user_guid":{"user_guid_id":"pms_setting_project_news","module_id":"pms"},
    "languages":{"language_id":"vi"}}
    
    dev.wahsis.net/api/user_guid?cm=add&dt={
    "user_guid":{ }}
    
    dev.wahsis.net/api/user_guid?cm=update&dt={
    "user_guid":{ },
    "languages":{"language_id":"vi"}}
     
    dev.wahsis.net/api/user_guid?cm=delete&dt={
        "user_guid":{"user_guid_id":"Mã hu?ng d?n *","module_id":"sms"}}
    // Tạo danh sách chức năng và nội dung hướng dẫn sử dụng.
    // 1/ Tên bảng user_guid
    // 2/ Chức năng, Thêm , xóa, sửa , tìm kiếm
    // 3/ Giao diện giống http://live.wahsis.net/#/buildings
    // 4/ Danh sách các thuộc tính
     
    // [user_guid_id] [varchar](256) NOT NULL,
    // [module_id] [varchar](32) NOT NULL,
    // [language_id] [varchar](8) NOT NULL,
    // [user_guid_content] [ntext] NULL,
    // [description] [ntext] NULL,
    // [top_memu] nvarchar(128),
    // [left_memu] nvarchar(128),
    // [sub_memu_name] nvarchar(256),


    /**Chon module */
    // [{"module_id":"sms","module_name":"SMS"},{"module_id":"pms","module_name":"PMS"},{"module_id":"pos","module_name":"POS"}]