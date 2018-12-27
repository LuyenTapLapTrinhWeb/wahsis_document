var arr = [1, 0, 2];
var newArr = arr.slice(0, -1);    // returns [1,0]

console.log(newArr);
$('#div1').text('[' + arr + ']');
$('#div2').text('[' + newArr + ']');