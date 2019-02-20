Request URL: http://pms-dev.wahsis.net/api/apartment_sales_receipt_payment?
Request Method: POST
Status Code: 200 OK
Remote Address: 125.212.211.168:80
Referrer Policy: no-referrer-when-downgrade
cm: add_only
dt: {"company":{"company_id":54744},"apartment_sales_receipt_payment":{"apartment_sales_deposit_id":579,"apartment_sales_contract_id":0,"branch_id":0,"agent_id":3,"amount":0,"currency_id":"VND","effective_date":"2019-02-20","cash_type":0,"exchange_rate":1,"total_amount":8000000000,"created_by_id":2,"created_by_name":"Administrator","bank_id":"","bank_name":"","payment_method":"","received_by":"","reason_id":"","owner_id":309,"owner_name":"Senturia Vườn Lài | DO1 |DO106 ","room_id":10007,"apartment_sales_marketing_id":1,"payment_period_id":0,"bill_type":5}}


function addOnlyApartmentSalesReceiptPayment(deposit, sales_cash_receipt_payment_list, bill_type) {
    let table = "apartment_sales_receipt_payment";
    let cm = "add_only";
    let dt = {
        "company": { "company_id": com_id }
        , "apartment_sales_receipt_payment": {
            "apartment_sales_deposit_id": deposit.apartment_sales_deposit_id,
            "apartment_sales_contract_id": 0,
            "branch_id": 0,
            "agent_id": deposit.agent_id,
            "amount": deposit.deposit_amount,
            "currency_id": deposit.currency_code, "effective_date": deposit.created_date.split(" ")[0], "cash_type": 0, "exchange_rate": 1,
            "total_amount": deposit.total_amount, "created_by_id": u_id, "created_by_name": u_name,
            "bank_id": "", "bank_name": "", "payment_method": "", "received_by": "", "reason_id": "",
            "owner_id": deposit.owner_deposit_id,
            "owner_name": deposit.owner_deposit_name + " " + deposit.owner_deposit_last_name,
            "room_id": deposit.room_id,
            "apartment_sales_marketing_id": deposit.apartment_sales_marketing_id,
            "payment_period_id": 0,
            "bill_type": bill_type
        }
    }
    dt = JSON.stringify(dt)
    UtilityService.getListObjectWithParam(table, cm, dt).then(function (response) {
        if (response.data.err === 0) {
            console.log(response.data.err + " Saved! apartment_sales_receipt_payment ")
        } else {
            console.error(response.data.err + " can't add apartment_sales_receipt_payment")
            return;
        }
    });
}