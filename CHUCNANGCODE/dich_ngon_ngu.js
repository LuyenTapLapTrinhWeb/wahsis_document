"<p class="text - capitalize">Creation date of old data must be less than creation date of new data.</p>"
var dich_ngon_ngu = {
  $filter("translate")("format_from_date"),
  format_from_date: "From date don't match format",
  format_to_date: "To date don't match format",
  from_to_date: "To date must greater than from date",
  check_from_to: "End date must be greater than start date",
  email_error: "Email invalidate",
  date_from_to: "From date and to date invalid",
  SUCCESS: "Success",
  WARNING: "Warning",
  edit_item: "Please choose item to edit!",
  delete_item: "Please choose item to delete!",
  Save_Error: "Save Error",
  Save_Success: "Save Success",
  Delete_Error: "Delete Error.",
  Delete_Success: "Delete Success.",
  DELETE_UNABLE: "Because the data has been used, it can not be deleted.",
  Notice: "Notice!",
  Are_you_sure: "Are you sure?",
  Yes_delete_it: "Yes, delete it!",
  DELETED: "Deleted",
  UPLOAD_ITEM_SUCCESS: "Upload image success",
  UPLOAD_ITEM_ERROR: "Upload image error",
  no_data: "Không có dữ liệu trong danh sách",
  CREATED_DATE_INVALID_FORMAT: "Created Date Invalid Format",
  LDPW_CREATED_DATE_LT_TODATE: "Creation Date Of Old Data Must Be Less Than Creation Date Of New Data.",
  LDPW_CREATED_OLD_DATE: "Old Data Date",
  LDPW_CREATED_NEW_DATE: "New Data Date",
  LDPW_COMPARE_OLDNEW: "So sánh",
  LDPW_CREATED_OLDNEW_INPUTYET: "Ngày tạo dữ liệu cũ/mới chưa xác nhập",
  no_translation
}
swal($filter("translate")("WARNING"), e, "warning");
var kiemtra_nhap_truockhi_luu = () => {
  if (!utility.checkValue($scope.roomkey_id)) {
    swal($filter("translate")("Save_Error"), $filter("translate")("c_red"), "warning");
  }
}
swal($filter("translate")("SUCCESS"), $filter("translate")("Save_Success"), "success");
if (response.data.err === 0) {
  $uibModalInstance.close();
  swal($filter("translate")("Save_Success"), $filter("translate")("Save_Success"), "success");
} else {
  swal($filter("translate")("Save_Error"), $filter("translate")("Save_Error"), "warning");
}
if (response.data.err === 0) {
  swal($filter("translate")("Delete_Success"), $filter("translate")("Delete_Success"), "success");
} else {
  swal($filter("translate")("Delete_Error"), $filter("translate")("Delete_Error"), "warning");
}
swal($filter("translate")("warning"), $filter("translate")("errjsonparse") + "\n" + e, "warning");
swal($filter("translate")("warning"), $filter("translate")("no_data"), "warning");

swal($filter("translate")("Notice"), "Get time of receipt error", "error");

swal($filter("translate")("Notice"), $filter("translate")("DO_NOT_FAST"), "error");
try { } catch (e) { swal($filter("translate")("warning"), e.message + "\n" + e.stack, "warning"); } finally { }


title: $filter("translate")("Are_you_sure"),
  type: "warning",
    showCancelButton: true,
      confirmButtonColor: "#DD6B55",
        confirmButtonText: $filter("translate")("Yes_delete_it"),
          closeOnConfirm: false
swal({
  title: $filter("translate")("CANCEL_CONFIRM_RESERVATION_BOOKING"),
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: $filter("translate")("YES_CANCEL_IT"),
  closeOnConfirm: false
}


swal({
  title: $filter("translate")("edit_item"),
  type: "warning",
  timer: 1240
});

swal("Warning!", $filter("translate")("Duplicate_input"), "warning");

if ($scope.selected.length > 0) {
  $scope.contract_no = $scope.selected.contract_no;
  $scope.selected_room = $scope.selected.selected_room;
  $scope.percent_of_remaining_commission = $scope.selected.percent_of_remaining_commission;
  choose_commissions_for_support($scope.contract_no, $scope.selected_room, $scope.percent_of_remaining_commission)
} else {
  swal($filter("translate")("Notice"), $filter("translate")("SELECTED_UNDEFINED"), "error");
}


if ($scope.selected_sales_commission.length > 0 || $scope.selected_commission_support.length > 0) {
  if ($scope.selected_sales_commission[0].selected_sales_commission) {
    $scope.selected = $scope.selected_sales_commission;
  } else if ($scope.selected_commission_support[0].selected_commission_support) {
    $scope.selected = $scope.selected_commission_support;
  }
  if ($scope.check_in_commission_for_support) {
    Openpopup_crud_commissions_for_support_ctrl($scope.selected[0], $scope.apartment_sales_commission_assign_support_list)
  } else {
    Openpopup_crud_commissions_for_support_ctrl($scope.selected[0], $scope.apartment_sales_commission_assign_list)
  }
} else {
  swal($filter("translate")("Notice"), $filter("translate")("SELECTED_UNDEFINED"), "error");
}

$scope.delete = function () {
  var previousWindowKeyDown = window.onkeydown;
  $rootScope.checkLogout()
  if ($scope.selected1.length !== 0 || $scope.selected.length !== 0) {


    swal({
      title: $filter("translate")("Are_you_sure"),
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: $filter("translate")("Yes_delete_it"),
      closeOnConfirm: false
    }, function () {
      if ($scope.selected.length !== 0) {
        $scope.object = {
          period_salary_id: $scope.selected[0].period_salary_id,
        }
        var dtJSON = JSON.stringify({
          pr_period_salary: JSON.parse(JSON.stringify($scope.object)),
          company: JSON.parse(JSON.stringify($scope.company))
        });
        UtilityService.deleteObject("pr_period_salary", dtJSON).then(function (response) {
          if (response.data.err === 0) {
            swal($filter("translate")("Delete_Success"), $filter("translate")("Delete_Success"), "success");
            $scope.load_info($scope.item_per_page, 1)
            $scope.selected1 = []
            $scope.selected = []
          } else {
            swal("Warning!", "Delete failed", "warning");
          }
        })
      } else {
        $scope.object = {
          stage_salary_id: $scope.selected1[0].stage_salary_id,
        }
        var dtJSON = JSON.stringify({
          pr_stage_salary: JSON.parse(JSON.stringify($scope.object)),
          company: JSON.parse(JSON.stringify($scope.company))
        });
        UtilityService.deleteObject("pr_stage_salary", dtJSON).then(function (response) {
          if (response.data.err === 0) {
            swal($filter("translate")("Delete_Success"), $filter("translate")("Delete_Success"), "success");
            $scope.load_info($scope.item_per_page, 1)
            $scope.selected1 = []
            $scope.selected = []
          } else {
            swal("Warning!", "Delete failed", "warning");
          }
        })
      }
    });
  } else {
    swal({
      title: "Please choose payment to delete!",
      timer: 1240,
      showConfirmButton: false,
      type: "error"
    });
  }
};

/* thong bao va tu dong tat */
swal({ title: $filter("translate")("SUCCESS"), text: $filter("translate")("Save_Success"), timer: 2000, type: "success" });
swal({ title: $filter("translate")("ERROR"), text: $filter("translate")("Save_Error"), timer: 2000, type: "error" });
swal({ title: $filter("translate")("Notice"), text: $filter("translate")("SELECTED_UNDEFINED"), timer: 2000, type: "error" });

swal({
  title: $filter("translate")("warning"),
  text: $filter("translate")("CANCEL_CONFIRM_RESERVATION_BOOKING"),
  type: "warning",
  timer: 2000,
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: $filter("translate")("YES_CANCEL_IT"),
  closeOnConfirm: false
}, function () {
  window.onkeydown = previousWindowKeyDown;
  $scope.sourceTemp = {
    source_id: $scope.item.source_id
  };
  var dataCancelReservation = JSON.stringify({
    company: $scope.companyTemp,
    apartment_sales_status: $scope.sourceTemp
  });
  // console.log(dataCancelReservation);
  UtilityService.getListObjectWithParam($scope.tableApartmentSaleStatus, 'delete', dataCancelReservation).success(function (response) {
    if (response.err === 0) {
      swal({ title: $filter("translate")("SUCCESS"), text: $filter("translate")("CANCEL_RESERVATION_SUCCESSFULLY"), timer: 3000, type: "success" });
      $uibModalInstance.close();
      soket_io_notify_data_change();
    } else {
      swal({ title: $filter("translate")("ERROR"), text: $filter("translate")("CANCEL_RESERVATION_FAILED"), timer: 3000, type: "error" });
    }
  });
});

Notify('Error.', 'top-right', '5000', 'red', 'fa-check', true);

/* dong' khong load resolve */
$scope.close = function () {
  $uibModalInstance.dismiss();
}
/* dong load resolve */
$scope.close = function () {
  $uibModalInstance.close();
}
/* danh sách chọn dịch theo ngon ngữ */
$scope.status_list = [{
  value: -1,
  name: $translate.instant("WAITING_APPROVAL")
}, {
  value: 1,
  name: $translate.instant("DEPOSIT_APARTMENT")
}, {
  value: 2,
  name: $translate.instant("CANCEL")
}];