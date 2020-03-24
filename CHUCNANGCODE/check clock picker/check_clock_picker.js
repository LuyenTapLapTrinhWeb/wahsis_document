$scope.to_time = item.to_time;
$scope.scheduler_name = item.scheduler_name;
$('.clockpicker').clockpicker()
    .find('input').change(function () {
        // TODO: time changed
        console.log(this.value);
    });
$('#demo-input').clockpicker({
    autoclose: true
});

if (something) {
    // Manual operations (after clockpicker is initialized).
    $('#demo-input').clockpicker('show') // Or hide, remove ...
        .clockpicker('toggleView', 'minutes');
}


var input = $('#input-a');
input.clockpicker({
    autoclose: true
});

// Manual operations
$('#button-a').click(function (e) {
    // Have to stop propagation here
    e.stopPropagation();
    input.clockpicker('show')
        .clockpicker('toggleView', 'minutes');
});
$('#button-b').click(function (e) {
    // Have to stop propagation here
    e.stopPropagation();
    input.clockpicker('show')
        .clockpicker('toggleView', 'hours');
});