$(document).ready(function () {
   
    $.ajax({
        type: "GET",
        url: "/Customer/GetAllCustomersForStore",
        data: "{}",
        success: function (data) {
            var s = '<option value="-1">Select a Customer</option>';
            $.each(data.data, function (k, item) {
                s += "<option value=" + item.CustomerId + ">" + item.Name + " " + item.Surname + "</option>";
            });
            $("#ddlCustomers").html(s);

            $("#ddlCustomers").val()
        }
    })

})