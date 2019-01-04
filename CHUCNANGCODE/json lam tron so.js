script type="text/javascript" language="javascript"

var myNumber = 19564.556

console.log("Lấy giá trị tuyệt đối: " + Math.abs(myNumber));

console.log("Làm tròn lên: " + Math.ceil(myNumber));

console.log("Làm tròn xuống: " + Math.floor(myNumber));

console.log("Trả về logarit: " + Math.log(myNumber));

console.log("Trả về căn bậc hai: " + Math.sqrt(myNumber));

/ script
/* lam tron 3 chu so thap phan  */
function truncate(num, places) {
    return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
}