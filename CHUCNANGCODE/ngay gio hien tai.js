/* ngay hieu luc nếu không có thì auto hôm nay */
let date = new Date();
let effective_date_combobox = $filter('date')(date, 'dd-MM-yyyy');
let effective_dates = UtilityCheckFormatService.change_date_to_save(effective_date_combobox);
$scope.it.effective_date = effective_dates;
return;

/* time_download*/
let date = new Date();
let current_time = $filter('date')(date, 'dd-MM-yyyy');
let time_download = UtilityCheckFormatService.change_date_to_save(current_time);
alasql('SELECT INTO xlsx("customer_list' + time_download + '.xlsx",?) FROM ?', [opts, [$scope.ds_report]]);