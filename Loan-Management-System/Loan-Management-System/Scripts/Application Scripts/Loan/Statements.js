$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/Loan/GetLoanStatements/" + $('#LoanId').val(),
        data: "{}",
        success: function (data) {
            if (data.data != null) {
                var s = '';
                $.each(data.data, function (k, item) {
                    $('#tblLoanStatements').append('<tr>' +
                        '<td>' + item.TransactionDate + '</td>' +
                        '<td>' + item.TransactionDescription + '</td>' +
                        '<td> R' + item.TransactionAmount + '</td>' +
                        '<td> R' + item.TransactionBalance + '</td>' +
                        '</tr>');

                })
            }
        }
    });
});

function GetLoanDetails() {
    window.location.href = '/Loan/LoanDetails/' + $('#LoanId').val();
}