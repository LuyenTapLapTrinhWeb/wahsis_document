$scope.is_click = true
$scope.ok = () => {

	if ($scope.is_click) {
		$scope.is_click = false;
		addObject(
			success => {
				$scope.is_click = true;
			}, err => {
				$scope.is_click = true;
			}
		)
	}
}
$scope.is_click = true
function loadthongtin_users_deposit() {
	/* chong click lien tuc voi ngay cap cmmd */
	let get_return_true_date = function (wrong_date) {
		if (utility.checkValue(wrong_date)) {
			let effective_date = wrong_date.split(" ");
			if (UtilityCheckFormatService.check_date(effective_date[0].split("-")) === false) {
				if (effective_date[0] !== "1900-01-01") {
					/* chong click lien tuc */
					return UtilityCheckFormatService.change_date_to_save(effective_date[0]);
				} else {
					return ""
				}
			} else {
				return UtilityCheckFormatService.change_date_to_save(effective_date[0]);
			}
		} else {
			return "";
		}
	}
	if ($scope.is_click) {
		$scope.is_click = false;
		/* ngay cap */
		$scope.deposit.identify_created = get_return_true_date($scope.deposit.identify_created)
		/* ngay het han */
		$scope.deposit.identify_expired = get_return_true_date($scope.deposit.identify_expired)
	}
}