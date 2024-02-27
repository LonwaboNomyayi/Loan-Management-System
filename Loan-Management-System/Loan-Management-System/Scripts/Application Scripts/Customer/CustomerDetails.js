$(document).ready(function () {
    //using the custome Id lets get the customer details 
    $.ajax({
        type: "GET",
        url: "/Customer/GetCustomerDetailsByKey/" + $("#customerId").val(),
        data: "{}",
        success: function (data) {
            //var s = '<option value="-1">Select a Group</option>';
            //$.each(data.data, function (k, item) {
            //    s += "<option value=" + item.GroupId + ">" + item.Description + "</option>";
            //});
            //$("#ddlGroup").html(s);
            if (data.data != null) {
                var customerData = data.data;
                $('#txtName').val(customerData.Name);
                $('#txtSurname').val(customerData.Surname);
                $('#txtIDNumber').val(customerData.IDNumber);
                $('#txtAddress1').val(customerData.AddressLine1);
                $('#txtAddress2').val(customerData.AddressLine2);
                $('#txtAddress3').val(customerData.AddressLine3);
                $('#txtAddress4').val(customerData.AddressLine4);
                $('#txtPostalCde').val(customerData.PostalCode);
                $('#txtPayDay').val(customerData.PayDay);
                $('#txtSalary').val(customerData.Salary);
            }
        }
    });

});

function AddOrUpdateCustomer() {
    //validations
    if ($('#txtName').val() == "") {
        toastr.error("Pleasse provide customer name");
    }
    else if ($('#txtSurname').val() == "") {
        toastr.error("Pleasse provide customer surname");
    }
    else if ($('#txtIDNumber').val() == "") {
        toastr.error("Pleasse provide customer ID Number");
    }
    else if ($('#txtAddress1').val() == "") {
        toastr.error("Pleasse provide customer Address1");
    }
    else if ($('#txtPayDay').val() == "") {
        toastr.error("Pleasse provide customer pay day");
    }
    else if ($('#txtSalary').val() == "") {
        toastr.error("Pleasse provide customer salary");
    }
    else {
        //all necessary fields were provided
        swal({
            title: "Confirm",
            text: "Are you sure you want to Save Customer Details ?",
            icon: "warning",
            buttons: true,
            showCancelButton: true
        }).then(function (isConfirm) {
            if (isConfirm) {

                var customer = {
                    "CustomerId": $('#customerId').val(),
                    "Name": $('#txtName').val(),
                    "Surname": $('#txtSurname').val(),
                    "IDNumber": $('#txtIDNumber').val(),
                    "AddressLine1": $('#txtAddress1').val(),
                    "AddressLine2": $('#txtAddress2').val(),
                    "AddressLine3": $('#txtAddress3').val(),
                    "AddressLine4": $('#txtAddress4').val(),
                    "PostalCode": $('#txtPostalCde').val(),
                    "PayDay": $('#txtPayDay').val(),
                    "Salary": $('#txtSalary').val()
                };

                


                $.ajax({
                    type: "POST",
                    url: '/Customer/AddOrUpdateCustomer',
                    data: { customer: customer },
                    success: function (data) {
                        if (data.data) {
                            window.location.href = '/Customer/Index';
                        }
                        else {
                            toastr.error(data.Message);
                        }
                    }
                });
            }
        });
    }


}
