$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/Loan/GetLoanStatements/" + $('#LoanId').val(),
        data: "{}",
        success: function (data) {
            if (data.data != null) {
                var s = '';
                $.each(data.data, function (k, item) {
                    var transactionAmount = parseFloat(item.TransactionAmount);
                    var transactionBalance = parseFloat(item.TransactionBalance);
                    var format = new Intl.NumberFormat('en-ZA', {
                        style: 'currency',
                        currency: 'ZAR',
                        minimumFractionDigits: 2
                    });

                    transactionAmount = format.format(transactionAmount);
                    transactionBalance = format.format(transactionBalance);

                    $('#tblLoanStatements').append('<tr>' +
                        '<td style="font-weight: bold; text-align: right;">' + item.TransactionDate + '</td>' +
                        '<td style="font-weight: bold;">' + item.TransactionDescription + '</td>' +
                        '<td style="font-weight: bold; text-align: right;">' + transactionAmount + '</td>' +
                        '<td style="font-weight: bold; text-align: right;">' + transactionBalance + '</td>' +
                        '</tr>');

                })
            }
        }
    });
});

function GetLoanDetails() {
    if ($('#IsCollection').val() == "false") {
        window.location.href = '/Loan/LoanDetails/' + $('#LoanId').val();
    }
    else {
        window.location.href = "/Loan/LoanCollection/" + $('#LoanId').val();
    }
}