.spiner-example {
    height: 107.5%;
    width: 100%;

    position: absolute;
    top: 0%;
    left: 0%;
    z-index: 10000;
    background: black;
    opacity: 0.6;
}
<div class="spiner-example" ng-show="is_load">
    <div class="sk-spinner sk-spinner-three-bounce">
        <div class="sk-bounce1"></div>
        <div class="sk-bounce2"></div>
        <div class="sk-bounce3"></div>
    </div>
</div>
UtilityService.decentralization("pms_project_deposit").then(function (response) {
    if (response.data.err === 0 && response.data.dt !== undefined) {
        $scope.is_load = true;
        $scope.load_data = () => {
            if (response.err === 0) {
                $scope.is_load = false;
            }
        }
    }
})