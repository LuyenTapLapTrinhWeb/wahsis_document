
function toysController($http) {
    let self = this;
    self.orderProp = "age"
    $http.get("../toys/toys.json").then(function (response) {
        self.toys = response.data.toys;
    })
}