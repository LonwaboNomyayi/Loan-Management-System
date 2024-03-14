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
            {
                "data": "LoanAmount",
                "render": function (data) {
                    return "R " + data;
                }

            },
            {
                "data": "InterestCharged",
                "render": function (data) {
                    return "R " + data;
                }
            },
            {
                "data": "ReturnAmount",
                "render": function (data) {
                    return "R " + data;
                }
            },

            {
                "data": "ReturnDate"
            },
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
        "scrollY": "2000px",
        "scrollCollapse": true,
        "pageLength": 100,
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            let today = new Date();
            let todayMonth = today.getMonth() + 1;
            let strDate = today.getFullYear() + '/' + todayMonth + '/' + today.getDate();
            today = new Date(strDate).toLocaleDateString();
            let returnDate = new Date(aData['ReturnDate']).toLocaleDateString();
            //Clients that need to be collected today 
            if (returnDate === today) {
                $('td', nRow).css('background-color', 'Green');
                $('td', nRow).css('color', 'White');
            }

            if (returnDate < today) {
                $('td', nRow).eq(5).css('background-color', 'Red');
                $('td', nRow).eq(5).css('color', 'White');
            }
        },
    });
}

function navigateToLoanDetails(Id) {
    window.location.href = "/Loan/LoanDetails/" + Id;
}