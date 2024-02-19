$(document).ready(function () {
    loadDataTable();

    //if ($('#sidebar-toggle').is(":checked")) {
    //    $("#target2").removeClass("btn-default")
    //}

})





function loadDataTable() {
    $('#tblCustomers').DataTable({
        "ajax": {
            "type": 'GET',
            "url": '/Customer/GetAllCUstomersForStore',
            "data": '{}',
            "contentType": 'application/json; charset=utf-8',
            "datatype": 'json',
            "cache": false,
        },
        "columns": [
            { "data": "CustomerId", "visible": false, "searchable": false },
            { "data": "Name" },
            { "data": "Surname" },
            { "data": "IDNumber" },
            { "data": "StreetAddressLine1", "visible": false, "searchable": false  },
            {
                "data": "CustomerId",
                "render": function (data, type, full) {
                    if (data != "") {
                        var customerId = data;
                        return "<a class='btn btn-warning btn-sm' onclick=navigateToCustomerDetails('" + customerId+"')> Edit</a>";
                    }
                }
            }
        ],
        "scrollY": "520px",
        "scrollCollapse": true
    });
}

function navigateToCustomerDetails(Id) {
    window.location.href = "/Customer/CustomerDetails/" + Id;
}