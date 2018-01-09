/**============================================================================================= */
/**NẾU KHÔNG TỒN TẠI THÌ TRẢ VỀ ĐÚNG KIỂU DỮ LIỆU */
/**RETURN TRUE/FALSE */
function checkValue(value) {
  return value !== undefined && value !== "" && value !== null ? true : false;
}
/**RETURN ARRAY */
function getArray(value) {
  return checkValue(value) ? value : [];
}
/**RETURN OBJECT */
function getObj(value) {
  return checkValue(value) ? JSON.parse(value) : {};
}
/**RETURN NUMBER */
function getNumber(value) {
  return checkValue(value) ? Number(String(value)) : 0;
}
/**RETURN STRING */
function getString(string) {
  return checkValue(string) ? string : "";
}
/**RETURN -1 */
function getNull(number) {
  return checkValue(number) ? parseInt(String(value)) : -1;
}
/**--RETURN TRUE/FALSE */
function checkNoErr(err) {
  return err === 0 ? true : false;
}
/**RETURN LANGUAGE */
function getLanguage(value) {
  return checkValue(value) ? value : "en";
}
/**RETURN DATE */
function getDate(value) {
  return checkValue(value) ? utility.change_date_to_save(value) : "";
}