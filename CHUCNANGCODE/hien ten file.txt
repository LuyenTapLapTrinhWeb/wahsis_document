if (item.resident_request_service_id !== 0) { 
        //hien ten file da upload truoc
        var fullPath = $scope.item.link_download_load
        var filename = fullPath.replace(/^.*[\\\/]/, '')
        $scope.dt.file_doc = filename; 
    }  