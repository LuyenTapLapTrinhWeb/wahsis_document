/**FIX CAI BUG TREE */
$scope.is_hide = true
$scope.change_hide = function () {
    $timeout(function () {
        if ($scope.is_hide == false) {
            $scope.is_hide = true
        } else {
            $scope.is_hide = false
        }
        $scope.$apply();
    }, 50)

}

var thaydoi = function () {
    if ($(".tree_left").hasClass("an")) {
        $(".tree_left").removeClass("an")
        $(".tree_left").addClass("hien")
        // $(".show_tree").removeClass("hien")
        // $(".show_tree").addClass("an")
        // $(".tree_text").removeClass("text_doc")

        $scope.change_hide();

        $(".content_right").removeClass("col-md-12 col-xs-12")
        $(".content_right").addClass("col-md-9 col-xs-12 pull-right")

        $(".truong_search").removeClass("col-xs-12 col-md-4")
        $(".truong_search").addClass("col-xs-12 col-md-6")

    } else {
        $(".tree_left").removeClass("hien")
        $(".tree_left").addClass("an")
        // $(".show_tree").removeClass("an")
        // $(".show_tree").addClass("hien")
        // $(".tree_text").addClass("text_doc")

        $scope.change_hide();
        $(".content_right").removeClass("col-md-9 col-xs-12 pull-right")
        $(".content_right").addClass("col-md-12 col-xs-12")
        $(".truong_search").removeClass("col-xs-12 col-md-6")
        $(".truong_search").addClass("col-xs-12 col-md-4")
    }
}
$scope.thaydoi = () => {
    thaydoi();
}