`Ở đây chúng tôi đã khai báo một bộ điều khiển được gọi PhoneListControllervà đăng ký nó trong một mô-đun AngularJS , phonecatApp. Lưu ý rằng lệnh của chúng tôi ngApp(trên <html>thẻ) hiện chỉ định phonecatApptên mô-đun là mô-đun sẽ tải khi khởi động ứng dụng.

Mặc dù bộ điều khiển chưa làm được gì nhiều, nhưng nó đóng một vai trò quan trọng. Bằng cách cung cấp ngữ cảnh cho mô hình dữ liệu của chúng tôi, bộ điều khiển cho phép chúng tôi thiết lập liên kết dữ liệu giữa mô hình và khung nhìn. Chúng tôi đã kết nối các dấu chấm giữa các thành phần trình bày, dữ liệu và logic như sau:

Lệnh ngControll , nằm trên <body>thẻ, tham chiếu tên của bộ điều khiển của chúng tôi, PhoneListController(nằm trong tệp JavaScript ).app.js

Bộ PhoneListControllerđiều khiển gắn dữ liệu điện thoại vào dữ liệu $scopeđã được đưa vào chức năng điều khiển của chúng tôi. Đây phạm vi là một hậu duệ nguyên chủng của phạm vi gốc được tạo ra khi ứng dụng đã được xác định. Phạm vi điều khiển này có sẵn cho tất cả các ràng buộc nằm trong thẻ.<body ng-controller="PhoneListController">`

/* Experiments */
