function ngTooltip() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            let title = $filter('translate')('STATUS_ACTIVE');
            let element = '[data-toggle="tooltip"]';
            // $(element).tooltip();
            $(element).attr({ 'title': title }).hover(function () {
                // on mouseenter
                $(element).tooltip('show');
                // $("#fa_question_circle_o").addClass("tooltiptext")
            }, function () {
                // on mouseleave
                $(element).tooltip('hide');
                // $("#fa_question_circle_o").removeClass("tooltiptext")
            });
        }
    };
}
angular
    .module('inspinia')
    .directive('tooltip', ngTooltip);