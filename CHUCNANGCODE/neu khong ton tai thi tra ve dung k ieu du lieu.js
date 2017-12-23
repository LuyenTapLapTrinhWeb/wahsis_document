/**NẾU KHÔNG TỒN TẠI THÌ TRẢ VỀ ĐÚNG KIỂU DỮ LIỆU */
/**RETURN TRUE/FALSE */
function checkValue(value) {
  return value !== undefined && value !== "" && value !== null ? true : false;
}
/**RETURN ARRAY */
function getArray(value) {
  return checkValue(value) ? value : [];
}
/**RETURN NUMBER */
function getNumber(value) {
  return checkValue(value) ? value : 0;
}
/**RETURN STRING */
function getString(string) {
  return checkValue(string) ? string : "";
}
/**RETURN -1 */
function getNull(number) {
  return checkValue(number) ? number : -1;
}