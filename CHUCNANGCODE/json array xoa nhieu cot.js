 // fix cai bug xoa nhieu cot trong json array
                $scope.new_config_value = [];
                for (var i = 0; i < $scope.config_value.length; i++) {
                    var item = {
                        id: $scope.config_value[i].id,
                        value: $scope.config_value[i].value,
                        order: $scope.config_value[i].order
                    }
                    $scope.new_config_value.push(item);
                }