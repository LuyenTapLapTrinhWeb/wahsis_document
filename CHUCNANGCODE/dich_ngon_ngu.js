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
try{}catch(e){swal($filter("translate")("warning"), e.message + "\n" + e.stack, "warning");}finally{}


title: $filter("translate")("Are_you_sure"),
  type: "warning",
    showCancelButton: true,
      confirmButtonColor: "#DD6B55",
        confirmButtonText: $filter("translate")("Yes_delete_it"),
          closeOnConfirm: false


swal({
  title: $filter("translate")("edit_item"),
  type: "warning",
  timer: 1240
});

swal("Warning!", $filter("translate")("Duplicate_input"), "warning");