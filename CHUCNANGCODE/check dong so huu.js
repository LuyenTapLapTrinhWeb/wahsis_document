Table: apartment_sales_reservation
Add 2 column: 

- is_parent :  value [ 1: là thằng đầu tiên ; 0: những thằng thêm sau đó ]

- parent_id : 
    + thằng đầu tiên: parent_id = -1
    + thằng thêm sau: parent_id = apartment_sales_reservation_id của thằng đầu tiên.
