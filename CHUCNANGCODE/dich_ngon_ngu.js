"<p class="text-capitalize">Creation date of old data must be less than creation date of new data.</p>"
var dich_ngon_ngu = {
  $filter("translate")("format_from_date"),
  format_from_date: "From date don't match format",
  format_to_date: "To date don't match format",
  from_to_date: "To date must greater than from date",
  check_from_to: "End date must be greater than start date",
  delete_item: "Please choose item to delete!",
  edit_item: "Please choose item to edit!",
  email_error: "Email invalidate",
  date_from_to: "From date and to date invalid",
  SUCCESS: "Success",
  WARNING: "Warning",
  Save_Error: "Save Error",
  Save_Success: "Save Success",
  Delete_Error: "Delete Error.",
  Delete_Success: "Delete Success.",
  Yes_delete_it: "Yes, delete it!",
  Are_you_sure: "Are you sure?",
  DELETED: "Deleted",
  UPLOAD_ITEM_SUCCESS: "Upload image success",
  UPLOAD_ITEM_ERROR: "Upload image error",
  no_data: "Không có dữ liệu trong danh sách",
  CREATED_DATE_INVALID_FORMAT: "Created Date Invalid Format",
  LDPW_CREATED_DATE_LT_TODATE: "Creation Date Of Old Data Must Be Less Than Creation Date Of New Data.",
  LDPW_CREATED_OLD_DATE: "Old Data Date",
  LDPW_CREATED_NEW_DATE: "New Data Date",
  LDPW_COMPARE_OLDNEW:"So sánh",
  LDPW_CREATED_OLDNEW_INPUTYET:"Ngày tạo dữ liệu cũ/mới chưa xác nhập"
}
if (response.data.err === 0) {
  $uibModalInstance.close();
  swal($filter("translate")("Save_Success"), $filter("translate")("Save_Success"), "success");
} else {
  swal($filter("translate")("Save_Error"), $filter("translate")("Save_Error"), "warning");
}
