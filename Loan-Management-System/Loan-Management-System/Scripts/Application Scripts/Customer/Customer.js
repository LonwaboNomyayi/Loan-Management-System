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
            "url": '/Customer/GetAllCustomersForStore',
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
            { "data": "AddressLine1", "visible": true, "searchable": false  },
            {
                "data": "CustomerId",
                "render": function (data, type, full) {
                    if (data != "") {
                        var customerId = data;
                       /* return "<a class='btn btn-warning btn-sm' onclick=navigateToCustomerDetails('" + customerId + "')><span class ='ti-pencil-alt'></span> Edit</a>";*/
                        return "<a class='btn btn-sm' style='background-color:#00246B; color:#fff;float: right;' onclick=navigateToLoanDetails('" + data + "')> <span class='ti-pencil-alt' style='color:#fff'></span> Edit</a > "
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