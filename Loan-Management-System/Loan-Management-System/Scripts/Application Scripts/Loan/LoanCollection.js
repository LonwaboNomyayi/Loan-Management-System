$(document).ready(function () {


    $.ajax({
        'type': 'GET',
        'url': '/Loan/GetCollectionDetails/' + $('#txtLoanCollectionId').val(),
        'data': '{}',
        'success': function (data) {
            if (data != null) {
                $('#txtCollectionDate').val(data.data.LoanDate.replace("/", "-").replace("/", "-"));
                $('#txtCustomer').val(data.data.CustomerFullNames);
                $('#txtCollectionAmount').val(data.data.LoanAmount);
                $('#txtRepaymentDate').val(data.data.LoanReturnDate.replace("/", "-").replace("/", "-"));
                $('#txtSettlementAmount').val(data.data.ReturnAmount);
            }
        }

    });
});

function GetStatement() {
    window.location.href = "/Loan/Statements/" + $('#txtLoanCollectionId').val();
}

function RegisterPayment() {
    var collection = {
        "LoanId": $('#txtLoanCollectionId').val(),
        "PaidAmount": $('#txtPaidAmount').val(),
        "ReturnDate": $('#txtRepaymentDate').val(),
        "FullPayment": false
    };

    var format = new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        minimumFractionDigits: 2
    });

    if (isNaN(parseFloat(collection.PaidAmount))) {
        toastr.error("Please enter a valid amount..");
    }
    else {
        var formatSettlementAmount = format.format($('#txtSettlementAmount').val());
        var formatPaidAmount = format.format(collection.PaidAmount);

        let today = new Date();
        let todayMonth = today.getMonth() + 1;
        let strDate = today.getFullYear() + '/' + todayMonth + '/' + today.getDate();
        today = new Date(strDate);


        if (formatSettlementAmount === formatPaidAmount) {
            collection.FullPayment = true;
            $.ajax({
                'type': 'POST',
                'url': '/Loan/RegisterPaymentForDefaultLoan',
                'data': { collection: collection },
                'success': function (data) {
                    if (data.data) {
                        window.location.href = '/Loan/Collections';
                    }
                    else {
                        toastr.error("The was an error processing your request...");
                    }
                }
            })
        }
        else {
            if (new Date(collection.ReturnDate) < today) {
                toastr.error("Please provide a repayment date for the remaining amount...");
            }
            else {
                $.ajax({
                    'type': 'POST',
                    'url': '/Loan/RegisterPaymentForDefaultLoan',
                    'data': { collection: collection },
                    'success': function (data) {
                        if (data.data) {
                            window.location.href = '/Loan/Collections';
                        }
                        else {
                            toastr.error("The was an error processing your request...");
                        }
                    }
                })
            }
        }
    }


    

    
}