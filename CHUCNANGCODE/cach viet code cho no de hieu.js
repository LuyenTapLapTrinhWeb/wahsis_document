/* CACH VIET CHUA DUOC RO RANG */
var JSonMarketingPaymentMethod = JSON.stringify({
    sms_payment_method: {
        "payment_method_type": 2
    },
    company: $scope.companyTemp,
    languages: $scope.languageTemp,
});
UtilityService.getListObjectWithParam("sms_payment_method", "search", JSonMarketingPaymentMethod).then(function (response) {
    if (response.data.err === 0) {
        // console.log(response)
        {

            $scope.payment_method_list = response.data.dt.sms_payment_method_list;

        }
    }
})

var JSonMarketingPaymentMethod2 = JSON.stringify({
    sms_payment_method: {
        "payment_method_type": 1
    },
    company: $scope.companyTemp,
    languages: $scope.languageTemp,
});
UtilityService.getListObjectWithParam("sms_payment_method", "search", JSonMarketingPaymentMethod2).then(function (response) {
    if (response.data.err === 0) {
        // console.log(response)
        {

            $scope.payment_method_list2 = response.data.dt.sms_payment_method_list;

        }
    }
})

/*  CACH VIET RO RANG DE HIEU*/
/* 1. đặt tên phương thức có ý nghĩa để dễ tìm
        2. Đặt tên cho con số có ý nghĩa để dễ gọi
        3. Đặt tên cho list có ý nghĩa để dễ đem ra ngoài xài
        4. Phạm vi $scope cho component, phạm vi let trong function*/
function get_payment_method_list_by_payment_method_type() {
    /* payment_method_type 1: dat coc 2: hop dong */
    let payment_method_type = {
        contract: 2,
        deposit: 1
    }
    var JSonMarketingPaymentMethod = JSON.stringify({
        sms_payment_method: {
            "payment_method_type": payment_method_type.contract
        },
        company: $scope.companyTemp,
        languages: $scope.languageTemp,
    });
    UtilityService.getListObjectWithParam("sms_payment_method", "search", JSonMarketingPaymentMethod).then(function (response) {
        if (response.data.err === 0) {
            // console.log(response)
            {

                $scope.payment_method_list_contract = response.data.dt.sms_payment_method_list;

            }
        }
    })
    var JSonMarketingPaymentMethod2 = JSON.stringify({
        sms_payment_method: {
            "payment_method_type": payment_method_type.deposit
        },
        company: $scope.companyTemp,
        languages: $scope.languageTemp,
    });
    UtilityService.getListObjectWithParam("sms_payment_method", "search", JSonMarketingPaymentMethod2).then(function (response) {
        if (response.data.err === 0) {
            // console.log(response)
            {
                $scope.payment_method_list_deposit = response.data.dt.sms_payment_method_list;
            }
        }
    })
}
get_payment_method_list_by_payment_method_type();