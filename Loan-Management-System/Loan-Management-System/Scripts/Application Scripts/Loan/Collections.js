$(document).ready(function () {
    var listOfMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var thisMonth = (new Date()).getMonth();


    $.each(listOfMonths, function (k, item) {

    });

    var s = '<option value="-1">Select a month</option>';
    $.each(listOfMonths, function (k, item) {
        if (k <= thisMonth) {
            var actualMonth = k + 1
            s += "<option value=" + actualMonth+ ">" + item + "</option>";
        }
    });
    $("#ddlMonths").html(s);


    //LoadCollections()
});

$('#ddlMonths').change(function () {
    if ($('#ddlMonths').val() != "-1") {
        LoadCollections()
    }
})


function LoadCollections() {
    var table = $("#tblCollections").DataTable();
    
    if ($.fn.DataTable.isDataTable('#tblCollections')) {
        table.destroy();
    }
    /*$('#tblCollections tbody').empty();*/
    $('#tblCollections').DataTable({
        "ajax": {
            "type": 'GET',
            "url": '/Loan/GetAllCollectionsForStore/' + $("#ddlMonths").val(),
            "data": "{}",
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
                        return "<a class='btn btn-sm' style='background-color:#00246B; color:#fff;float: right;' onclick=navigateToLoanDetails('" + data + "')><span class ='ti-pencil-alt' style='color:#fff'></span> Edit</a>";
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
            today = new Date(strDate);
            let returnDate = new Date(aData['ReturnDate']);

            var diff = new Date(returnDate - today);

            var days = diff / 1000 / 60 / 60 / 24;


            //Clients that need to be collected today 
            if (returnDate.toLocaleDateString() === today.toLocaleDateString()) {
                $('td', nRow).css('background-color', '#2963A2');
                $('td', nRow).css('color', 'White');
            }

            //Loan not returned on its date 
            if (returnDate < today) {
                $('td', nRow).eq(5).css('background-color', 'Red');
                $('td', nRow).eq(5).css('color', 'White');
            }

            if (days > 0 && days <= 7 && days != 0) {
                $('td', nRow).css('background-color', '#8AB6F9');
                $('td', nRow).css('color', 'White');
            }
        },
    });

}