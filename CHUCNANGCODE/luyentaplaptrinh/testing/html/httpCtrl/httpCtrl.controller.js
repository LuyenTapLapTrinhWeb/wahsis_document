function httpCtrl($scope, $http, $timeout) {
  $scope.myWelcome = "";
  $scope.users = [];

  var uri = "https://jsonplaceholder.typicode.com/users";
  $http
    .get(uri)
    .then(function(response) {
      if (response.status === 200) {
        if (response.data.length < 0) {
          $scope.myWelcome = "Status Err 400. Data not found.";
        } else {
          $timeout(function() {
            $scope.myWelcome = "How are you today?";
            $scope.users = response.data;
          }, 2000);
        }
      } else {
        alert("Status Err 404. Data not found.");
      }
    })
    
}
