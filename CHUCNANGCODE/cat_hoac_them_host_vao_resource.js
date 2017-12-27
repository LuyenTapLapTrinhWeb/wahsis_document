/**cat them host vao resource khi update */
if ($scope.it.resident_request_service_id !== "") {
    if (
        $scope.it.link_download_load !== "" &&
        $scope.it.link_download_load !== undefined &&
        $scope.it.link_download_load !== null
    ) {
        $scope.dt.full_link =
            API_URL_UPLOAD.replace("/api", "") + $scope.it.link_download_load;
        $scope.dt.link_doc = $scope.it.link_download_load.replace(API_URL_UPLOAD.replace("/api", ""), "");
        $scope.dt.file_doc = $filter("translate")("DOWNLOAD_FILE");

        $scope.is_delete = true;
    } else {
        $scope.dt.full_link = "";
    }
}