controller: ['$http', '$routeParams',
    function PhoneDetailController($http, $routeParams) {
        var self = this;

        self.setImage = function setImage(imageUrl) {
            self.mainImageUrl = imageUrl;
        };

        $http.get('phones/' + $routeParams.phoneId + '.json').then(function(response) {
            self.phone = response.data;
            self.setImage(self.phone.images[0]);
        });
    }
]