/**NẾU KHÔNG TỒN TẠI THÌ TRẢ VỀ ĐÚNG KIỂU DỮ LIỆU */
function checkArray(array) {
    return array !== undefined && array !== "" && array !== null
      ? true
      : false;
  }
  function getArray(array) {
    return checkArray(array) ? array : [];
  }
  function getLevel(level) {
    return checkArray(level) ? level : 0;
  }
  function getScope(scopes) {
    return checkArray(scopes) ? scopes : "";
  }