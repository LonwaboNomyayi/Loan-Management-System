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