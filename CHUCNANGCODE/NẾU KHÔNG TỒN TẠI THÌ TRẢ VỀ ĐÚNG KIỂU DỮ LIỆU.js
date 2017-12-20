/**NẾU KHÔNG TỒN TẠI THÌ TRẢ VỀ ĐÚNG KIỂU DỮ LIỆU */
/**RETURN TRUE/FALSE */
function checkValue(value) {
  return array !== undefined && array !== "" && array !== null ? true : false;
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
function getTruMot(number) {
  return checkValue(number) ? String(number) : -1;
}