/* http://team.wahsis.net/browse/WPMS-1325 */
/* Hi anh Thanh,

CC Hoang, Phan

Mô tả: Sau khi công nợ đã xác nhận đặt cọc => update trạng thái của deposit thành 3.

Thì admin mới có quyền vào pop up đặt cọc này để làm đặt cọc.

Các yêu cầu cần thực hiện:

Hiển thị thêm tiến độ thanh toán trên màn hình đặt cọc.
Hiển thị nút đặt cọc hợp lý theo trạng thái của đặt cọc và phải được phân quyền add new theo resource id
Sau khi bấm Đặt cọc thì sẽ gọi câu Update lại 3 field: payment_method_id, deposit_code, status = 4.
Thanks anh. */
/* phân tích task */
/*  Sau khi công nợ đã xác nhận đặt cọc => update trạng thái của deposit thành 3. */
function updateDepositAfterTheDebtHasConfirmedTheDeposit(deposit) {
    let deposit_status = deposit.status;
    if (deposit_status) {
        switch (deposit_status) {
            case 1: tranferADeposit();
            case 2: cancelADeposit();
            case 3: confirmADeposit();//xác nhận đặt cọc
            case 4: makeADeposit();//làm đặt cọc
            case 5: confirmAContract();
        }
        function tranferADeposit() {
        }
        function cancelADeposit() {
        }
        function confirmADeposit() {
        }
        function makeADeposit() {
            /* Hiển thị thêm tiến độ thanh toán trên màn hình đặt cọc. */
            $scope.show_additional_payment_schedule_on_deposit_screen = true;
            /* Hiển thị nút đặt cọc hợp lý theo trạng thái của đặt cọc và phải được phân quyền add new theo resource id */
            $scope.according_to_the_status_of_the_deposit = deposit_status === 4 && $scope.pms_project_map_location_tranfer_deposit
            if (according_to_the_status_of_the_deposit) {

                $scope.show_make_a_deposit_button = true;
            } else {
                $scope.show_make_a_deposit_button = false;
            }
            function UpdateTheStatusOfDeposit() {
                if (after_clicking_deposit) {
                    class DepositContructor {
                        constructor(payment_method_id = 0, deposit_code = "", status = -1) {
                            this.payment_method_id = payment_method_id;
                            this.deposit_code = deposit_code;
                            this.status = status;
                        }
                    }
                    let myConfirmedTheDeposit = new DepositContructor(2, 3, 3);
                    return myConfirmedTheDeposit;
                }
            }
            /* Sau khi bấm Đặt cọc thì sẽ gọi câu Update lại 3 field: payment_method_id, deposit_code, status = 4. */
            return UpdateTheStatusOfDeposit();
        }
        function confirmAContract() {

        }
    } else {
        console.error("deposit_status not found", deposit_status)
    }
}
