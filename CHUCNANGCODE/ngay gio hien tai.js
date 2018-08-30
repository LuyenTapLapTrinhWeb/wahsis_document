/* ngay hieu luc nếu không có thì auto hôm nay */
let date = new Date();
let effective_date_combobox = $filter('date')(date, 'dd-MM-yyyy');
let effective_dates = UtilityCheckFormatService.change_date_to_save(effective_date_combobox);
$scope.it.effective_date = effective_dates;
return;