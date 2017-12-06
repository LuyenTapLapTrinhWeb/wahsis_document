Hi Thanh,
1/ Trên màn hình thêm mới và cập nhật, em bổ sung trạng thái vào chức năng nhập căn hộ không tính phí như sau:
+ Label : Trạng thái (Status)
+ Value là option do người dùng chọn.
        1 : Active (Không tính phí)
        0 : DeActive (Hủy)
+ API apartment_fee_skip_calculations:{..............., status:1}
Default khi thêm là Active.
2/ Bổ sung trong option trong dk search
+ Label : Trạng thái (Status)
+ Value là option do người dùng chọn.
        1 : Active (Không tính phí)
        0 : DeActive (Hủy)
       -1 : All (Tất cả)
 + API : apartment_fee_skip_calculations:{..............., status:-1}
3/ Thêm 1 cột trong danh sách sau khi search
  1 : Active (Không tính phí)
  0 : DeActive (Hủy)
 