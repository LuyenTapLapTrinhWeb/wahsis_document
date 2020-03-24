function toysListController($http) {
    let self = this;
    this.orderProp = "name"
    $http.get('toys/toys.json').then(function success(response) {
        self.toys = response.data;
    }, function error(response) {
        console.error(response.msg)
    })
}