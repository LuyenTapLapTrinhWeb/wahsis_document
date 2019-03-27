var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope) {
    $scope.response = {
        "err": 0,
        "msg": "No error",
        "dt": {
            "apartment_sales_receipt_payment_list": [
                {
                    "payment_period_id": 15,
                    "amount": 5.76E9,
                    "payment_date": "2019-02-14 00:00:00.0",
                    "number_date": -41,
                    "payment_period": 1
                },
                {
                    "payment_period_id": 16,
                    "amount": 8.4E8,
                    "payment_date": "2019-03-16 00:00:00.0",
                    "number_date": -11,
                    "payment_period": 2
                },
                {
                    "payment_period_id": 17,
                    "amount": 8.4E8,
                    "payment_date": "2019-04-15 00:00:00.0",
                    "number_date": 19,
                    "payment_period": 3
                },
                {
                    "payment_period_id": 18,
                    "amount": 8.4E8,
                    "payment_date": "2019-05-15 00:00:00.0",
                    "number_date": 49,
                    "payment_period": 4
                },
                {
                    "payment_period_id": 19,
                    "amount": 3.12E9,
                    "payment_date": "2020-05-14 00:00:00.0",
                    "number_date": 414,
                    "payment_period": 5
                },
                {
                    "payment_period_id": 20,
                    "amount": 6.0E8,
                    "payment_date": "2021-05-14 00:00:00.0",
                    "number_date": 779,
                    "payment_period": 6
                }
            ],
            "interest_list": [
                {
                    "payment_period_id": 15,
                    "interest": 5.76E9,
                    "interest_period": 1
                },
                {
                    "payment_period_id": 16,
                    "interest": 0.0,
                    "interest_period": 2
                },
                {
                    "payment_period_id": 17,
                    "interest": -5.76E9,
                    "interest_period": 3
                },
                {
                    "payment_period_id": 18,
                    "interest": -1.152E10,
                    "interest_period": 4
                },
                {
                    "payment_period_id": 19,
                    "interest": -1.728E10,
                    "interest_period": 5
                },
                {
                    "payment_period_id": 20,
                    "interest": -2.304E10,
                    "interest_period": 6
                }
            ]
        }
    }
    $scope.apartment_sales_receipt_payment_list = $scope.response.dt.apartment_sales_receipt_payment_list;
    $scope.interest_list = $scope.response.dt.interest_list;
    var arr12 = $scope.response.dt.apartment_sales_receipt_payment_list;
    var arr22 = $scope.response.dt.interest_list;
    /* example: let arr1 = [
         { id: "abdc4051", date: "2017-01-24" },
         { id: "abdc4052", date: "2017-01-22" }
     ];
     let arr2 = [
         { id: "abdc4051", name: "ab" },
         { id: "abdc4052", name: "abc" }
     ];
      */
    function ghepMangES6(arr12, arr22) {
        var arr3 = [];
        arr12.forEach(function (itm, i) {
            arr3.push(Object.assign({}, itm, arr22[i]));
        });
        return arr3;
    }
    $scope.children_array = ghepMang($scope.apartment_sales_receipt_payment_list, $scope.interest_list)

});