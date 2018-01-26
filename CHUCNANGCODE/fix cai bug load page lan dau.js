HƯỚNG DẪN FIX CÁI BUG LOAD PAGE LAN DAU

HIỆN TƯỢNG:
DataTables warning: table id=DataTables_Table_4 - 
Cannot reinitialise DataTable. 
For more information about this error, please see http://datatables.net/tn/3

NGUYÊN NHÂN: 
Nếu gọi cùng lúc hai API search hoặc report vì sẽ gây ra lỗi trùng API làm cho databtable không thể load dữ liệu

CÁCH SỬA:
Chỉ gọi API search hoặc report của một trong hai nơi là watch hoặc denlization.