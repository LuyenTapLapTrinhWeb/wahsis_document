/* VI DU LUYEN TAP */
https://www.w3schools.com/angular/tryit.asp?filename=try_ng_ng-options
/* DINH NGHIA NG-OPTIONS
array expression	An expression that selects the specified parts of an array to fill the select element.

Legal expressions:

label for value in array

select as label for value in array

label group by group for value in array

label disable when disable for value in array

label group by group for value in array track by expression

label disable when disable for value in array track by expression

label for value in array | orderBy expression track by expression */

/* CAI DAT LABEL NGON NGU THEO LA CO */
$scope.$watch(function ($scope) {
    return $scope.abc = $filter('translate')('NOTE_FORMAT1')
}, function () {
    $timeout($scope.get_agents_list(), 1000);
});
/* CAI DAT API LIST */
$scope.get_agents_list = () => {
    $scope.str_search_agents = { agent_type_id: -1, term_paid: -1 };
    var dt = JSON.stringify({ agents: JSON.parse(JSON.stringify($scope.str_search_agents)), company: JSON.parse(JSON.stringify($scope.company)), languages: JSON.parse(JSON.stringify($scope.languageTemp)) });
    UtilityService.getListObjectWithParam("agents", "search", dt).then(function (response) {
        if (response.data.err === 0) {
            $scope.agentsList = response.data.dt.agents_list
            for (var i = 0; i < $scope.agentsList.length; i++) {
                $scope.agentsList[i].disable = false;
                if ($scope.agentsList[i].agent_type_id === 1) {
                    $scope.agentsList[i].agent_type_name = $filter('translate')('AGENT');
                } else {
                    $scope.agentsList[i].agent_type_name = $filter('translate')('SELLER_GROUP');
                }
            }
        }
    })
}
/* CAI DAT HTML */
<select chosen="" class="chosen-select width100" id="states" ng-model="agent_id"
    ng-options="value.agent_id as value.agent_name group by value.agent_type_name for value in agentsList"
    required="true">
    <option value="">{{ "ALL"| translate }} </option>
</select>
 