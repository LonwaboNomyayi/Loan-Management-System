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