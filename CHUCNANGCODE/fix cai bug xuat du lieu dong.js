<!DOCTYPE html>
<html>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
<style>
table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}
th, td {
    padding: 15px;
}
</style>
<body>

<p>Try to change the names.</p>

<div ng-app="myApp" ng-controller="myCtrl">
  <table >
     <tr>
         <th ng-repeat="x in header_list">
             {{x}}
            </th>
        </tr>
        <tr ng-repeat="obj in list">
         <td ng-repeat="col in column_list">
             {{obj[col]}}
            </td>
        </tr>
    </table>
</div>

<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    
    //Danh sách Mr.Nam thiết lập
    $scope.header_list1 = "stt,Tên,Số tiền";
    $scope.column_list1 = "stt,name,amount";
    //lấy về và biến thành cái mảng 1 chiều
    $scope.header_list = $scope.header_list1.split(',');
    $scope.column_list = $scope.column_list1.split(',');
    //danh sách được lấy từ API tìm kiếm
    $scope.list = [{"amount":100,"stt":1,"name":"Thanh"},{"amount":100,"stt":2,"name":"Thanh"},{"amount":100,"stt":3,"name":"Thanh"},{"amount":100,"stt":4,"name":"Thanh"},{"amount":100,"stt":5,"name":"Thanh"},{"amount":100,"stt":6,"name":"Thanh"},{"amount":100,"stt":7,"name":"Thanh"},{"amount":100,"stt":8,"name":"Thanh"}]
 
});
</script>

</body>
</html>