


/**list 2: Danh sách tài khoản user của công ty */
$scope.users = {
    account_type: "1,2",
    users_id: u_id,
    agent_id: 0
    // is_active: $scope.is_active
}
$scope.page = { page_index: 1, page_size: 100000 };
var json_user = JSON.stringify({
    users: JSON.parse(JSON.stringify($scope.users)),
    company: JSON.parse(JSON.stringify(companyTemp)),
    page: JSON.parse(JSON.stringify($scope.page)),
    languages: JSON.parse(JSON.stringify($scope.languageTemp))
});
// console.log("user của công ty: ", json_user)
UtilityService.getListObjectWithParam("users", "list_by_account_type", json_user).then(function (response) {
    // console.log(response);
    if (response.data.err === 0) {
        /**
         * B2 : lẫy dữ liệu cần phải thêm . Danh sách users của công ty 
         * là dữ liệu trong cái combobox đang có
         */
        $scope.accounts_list = response.data.dt.users_list;
        // alert("vaoday")
    }
});

/**list 1: dữ liệu đã thêm vào hệ thống */
$scope.company_boss_account= { "company_id": com_id, "account_type": 1 }
var page = { page_index: 1, page_size: 100000 }
var json = JSON.stringify({
    company_boss_account: JSON.parse(JSON.stringify($scope.company_boss_account)),
    page: page
});

UtilityService.getListObjectWithParamDev("company_boss_account", "account_list", json).then(function (response) {
    if (response.data.err === 0) {
        $scope.company_boss_account_list = response.data.dt.company_boss_account_list;

        $scope.dulieu_dathemvao_hethong = response.data.dt.company_boss_account_list;
    }
})


$scope.dulieu_dathemvao_hethong = [];
$scope.dulieu_account_combobox = [];
$scope.accounts_list = [];
$scope.user_list = [];