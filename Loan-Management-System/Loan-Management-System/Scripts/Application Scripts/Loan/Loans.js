$(document).ready(function () {

    LoadLoans()
});

function LoadLoans() {
    $('#tblLoans').DataTable({
        "ajax": {
            "type": 'GET',
            "url": '/Loan/GetAllLoansForStore',
            "data": '{}',
            "contentType": 'application/json; charset=utf-8',
            "datatype": 'json',
            "cache": false,
        },
        "columns": [
            { "data": "LoanID", "visible": false, "searchable": false },
            { "data": "LoanDate" },
            { "data": "LoanHolder" },
            { "data": "LoanAmount" },
            { "data": "ReturnDate" },
            { "data": "InterestCharged" },
            {
                "data": "LoanID",
                "render": function (data, type, full) {
                    if (data != "") {
                        var customerId = data;
                        return "<a class='btn btn-warning btn-sm' onclick=navigateToLoanDetails('" + data + "')><span class ='ti-pencil-alt'></span> Edit</a>";
                    }
                }
            }
        ],
        "scrollY": "520px",
        "scrollCollapse": true
    });
}

function navigateToLoanDetails(Id) {
    window.location.href = "/Loan/LoanDetails/" + Id;
}