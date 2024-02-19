$(document).ready(function () {
    //using the custome Id lets get the customer details 
    $.ajax({
        type: "GET",
        url: "/Customer/GetCustomerDetailsByKey/" + $("#CustomerId").val(),
        data: "{}",
        success: function (data) {
            //var s = '<option value="-1">Select a Group</option>';
            //$.each(data.data, function (k, item) {
            //    s += "<option value=" + item.GroupId + ">" + item.Description + "</option>";
            //});
            //$("#ddlGroup").html(s);

        }
    });

});