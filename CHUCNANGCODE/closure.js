var utility = (function Counter() {
    let counter = 0;
    function up(value) {
        counter += value;
    }
    function down(value) {
        counter -= value;
    }
    return {
        up: function () {
            up(1)
        },
        down: function () {
            down(1);
        },
        value: function () {
            return counter;
        }
    };
})();
alert(utility.value());
utility.up();
alert(utility.value());
utility.down();
alert(utility.value());
