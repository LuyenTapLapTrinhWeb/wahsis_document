$scope.is_click = true
$scope.ok = ()=>{

	if($scope.is_click){
		$scope.is_click= false;
		addObject(
			success => {
				$scope.is_click = true;
			}, err => {
				$scope.is_click = true;
			}	
		)		
	}
}