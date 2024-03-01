$(document).ready(function () {
   
   

    if ($('#LoanId').val() != "0") {
        //load all data to fill the form 
        $("#txtLoanDate").prop("disabled", true);
        $("#ddlCustomers").prop("disabled", true);
        $("#txtLoanAmount").prop("readonly", true);
        $("#txtReturnAmount").prop("readonly", true);
        $("#txtLoanReturnDate").prop("disabled", true);
        $("#txtLoanInterest").prop("readonly", true);

        $.ajax({
            type: "GET",
            url: "/Loan/GetLoanDetails/" + $('#LoanId').val(),
            data: "{}",
            success: function (data) {
                var loanData = data.data;
                if (loanData != null) {
                    var loanDate = loanData.LoanDate.replace("/", "-");
                    var loanReturnDate = loanData.LoanReturnDate.replace("/", "-").replace("/", "-");

                    $('#txtLoanDate').val(loanDate.replace("/", "-")); //this is a short term fix - not sure why its only replacing 1 foward slash 
                    $("#txtLoanAmount").val(parseFloat(loanData.LoanAmount, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
                    $('#txtLoanReturnDate').val(loanReturnDate);
                    $('#txtReturnAmount').val(parseFloat(loanData.ReturnAmount, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
                    $('#txtLoanInterest').val(loanData.LoanInterest);
                    //$('#txtLoanStatus').val(loanData.LoanStatus);


                    //lets load the ddl here -customer drop list
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
                            $('#ddlCustomers').val(loanData.LoanCustomerKey);
                        }
                    });


                    //loan status drop list 
                    $.ajax({
                        type: "GET",
                        url: "/Loan/GetLoanStatuses",
                        data: "{}",
                        success: function (data) {
                            var s = '<option value="-1">Select loan Status</option>';
                            $.each(data.data, function (k, item) {
                                s += "<option value=" + item.LoanStatusId + ">" + item.LoanStatusDesc + "</option>";
                            });
                            $("#ddlLoanStatus").html(s);
                            $('#ddlLoanStatus').val(loanData.LoanStatus);
                        }
                    });
                    
                }
            }
        })
    }
    else {
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

            }
        })
    }

})

function AddOrUpdateLoan() {

}