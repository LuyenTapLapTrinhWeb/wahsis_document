/* boolean */
let is_check = true;
/* number */
let score = 10;
/* string */
let subject = "Math";
/* function input boolean return string*/
function checkMath(is_check) {
    if (is_check) {
        return subject + "=" + score;
    }
}
let checking = [true, true, false, true, false, true, false, false, true];
document.body.innerHTML = checkMath(checking[0]);
alert(checkMath(checking[1]));
/* function INPUT number DEFAULT RETURN 0*/
function checkScore(score = 10) {
    if (score === 10) {
        return score;
    }
    else {
        return 0;
    }
}
document.body.innerHTML = checkScore() + "";
alert(checkScore(100));
