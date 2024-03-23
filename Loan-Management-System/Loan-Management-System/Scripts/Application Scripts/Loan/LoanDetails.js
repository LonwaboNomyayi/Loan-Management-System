$(document).ready(function () {
    var dt = new Date();
    var dtMonth = dt.getMonth() + 1;
    var dtDay = dt.getDate();
    if (dtMonth.toString().length == 1) {
        dtMonth = "0" + dtMonth
    }
    if (dtDay.toString().length == 1) {
        dtDay = "0" + dtDay;
    }

    var todayDate = dt.getFullYear() + "-" + (dtMonth) + "-" + dtDay;
    //var todayDateFormated = new Date(todayDate);
    //We need the following fields to be disabled even if its a loan add or edit process 
    $("#txtReturnAmount").prop("readonly", true);
    $("#txtLoanInterest").prop("readonly", true);

    $("#txtLoanDate").prop("disabled", true);
    $("#txtLoanDate").val(todayDate);

    if ($('#LoanId').val() != "0") {
        $('#PaidContainer').show();
        $('#InterestContainer').hide();
        //load all data to fill the form 
       
        $("#ddlCustomers").prop("disabled", true);
        $("#txtLoanAmount").prop("readonly", true);
        
        //$("#txtLoanReturnDate").prop("disabled", true);
        

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

                    //hidden values 
                    $('#txtNonFormatedLoanAmount').val(loanData.LoanAmount);
                    $('#txtOldReturnDate').val(loanReturnDate);
                    $('#txtNonFormatedLoanReturnAmount').val(loanData.ReturnAmount);
                    $('#txtCurrentLoanStatus').val(loanData.LoanStatus)

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
        //ddl customer details 
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

        //ddl Loan statuses 
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
                $('#ddlLoanStatus').val("1");
                $("#ddlLoanStatus").prop("disabled", true);
            }
        });
    }

})

$('#txtLoanAmount').change(function () {
    //When Loam Amount is provided we need to calculate the ReturnAmount and the LoanInterest Chanrged
    $('#txtReturnAmount').val((parseFloat($('#txtLoanAmount').val()) / 2) + parseFloat($('#txtLoanAmount').val()));
    $('#txtLoanInterest').val(parseFloat($('#txtLoanAmount').val()) / 2);
});

$('#ddlLoanStatus').change(function () {
    if ($('#ddlLoanStatus').val() == "3") {
        $('PaidContainer').hide();
    } else if ($('#ddlLoanStatus').val() != "3" && $('#LoanId').val() != "0") {
        $('PaidContainer').show();
    }
})




function AddOrUpdateLoan() {
    if ($('#LoanId').val() != "0") {

        swal({
            title: "Confirm",
            text: "Are you sure you want to make changes to this loan ?",
            icon: "warning",
            buttons: true,
            showCancelButton: true
        }).then(function (isConfirm) {
            if (isConfirm) {
                if ($('#ddlLoanStatus').val() === "5") {
                    if (new Date($('#txtLoanReturnDate').val()) < new Date()) {
                        swal({
                            title: "Confirm",
                            text: "You are about to mark this loan as default, Do you connfirm this ?",
                            icon: "warning",
                            buttons: true,
                            showCancelButton: true
                        }).then(function (isConfirm) {
                            if (isConfirm) {
                                var loanDetails = {
                                    "LoanId": $('#LoanId').val(),
                                    "LoanStatus": $('#ddlLoanStatus').val()
                                };

                                $.ajax({
                                    type: "POST",
                                    url: '/Loan/DefaultLoan/',
                                    data: { loanDetails: loanDetails },
                                    success: function (data) {
                                        if (data.data) {
                                            window.location.href = '/Loan/Index';
                                        }
                                        else {
                                            toastr.error(data.Message);
                                        }
                                    }
                                });

                            }
                        });
                    }
                    else {
                        toastr.error("Cannot mark this load as default before the return date is passed.");
                    }
                }
                else {
                    //For Principal status - we require the client to pay atlease the principal
                    if (parseFloat($('#txtNonFormatedLoanAmount').val()) <= parseFloat($('#txtPaidAmount').val()) && parseFloat($('#txtPaidAmount').val()) < parseFloat($('#txtNonFormatedLoanReturnAmount').val())) {
                        //allowed Principal Payment
                        let oldDate = new Date($('#txtOldReturnDate').val());
                        let newDate = new Date($('#txtLoanReturnDate').val());
                        let amountDue = parseFloat($('#txtNonFormatedLoanReturnAmount').val()) - parseFloat($('#txtPaidAmount').val());
                        if (oldDate < newDate && $('#ddlLoanStatus').val() === "3") {

                            swal({
                                title: "Confirm",
                                text: "You are making a Principal Payment, and still need to pay interest \nPrincipal Payment: R " + $('#txtPaidAmount').val() + "\nOutstanding Amount: R " + amountDue,
                                icon: "warning",
                                buttons: true,
                                showCancelButton: true
                            }).then(function (isConfirm) {
                                if (isConfirm) {
                                    var loanDetails = {
                                        "LoanId": $('#LoanId').val(),
                                        "PaidAmount": $('#txtPaidAmount').val(),
                                        "ReturnDate": $('#txtLoanReturnDate').val(),
                                        "FullPayment": false,
                                        "RemainingPayment": amountDue,
                                        "LoanStatus": $('#ddlLoanStatus').val()
                                    }

                                    $.ajax({
                                        type: "POST",
                                        url: '/Loan/UpdateLoanPayment',
                                        data: { loanDetails: loanDetails },
                                        success: function (data) {
                                            if (data.data) {
                                                window.location.href = '/Loan/Index';
                                            }
                                            else {
                                                toastr.error(data.Message);
                                            }
                                        }
                                    });

                                }
                            });


                        }
                        else if ($('#ddlLoanStatus').val() != "3") {
                            toastr.error("Please update the status to Principal Paid");
                        }
                        else {
                            toastr.error("Please update the return payment date since you are making Principal Payment");
                        }

                    }
                    else if ($('#txtCurrentLoanStatus').val() === "3") {
                        //The customer did make the principal amount now lets see if they are paying of the balance or making part of the remaining payment
                        var loanDetails = {
                            "LoanId": $('#LoanId').val(),
                            "PaidAmount": $('#txtPaidAmount').val(),
                            "ReturnDate": $('#txtLoanReturnDate').val(),
                            "LoanStatus": $('#ddlLoanStatus').val(),
                            "FullPayment": false
                        }

                        if (parseFloat($('#txtPaidAmount').val()) === parseFloat($('#txtNonFormatedLoanReturnAmount').val())) {
                            //this is a full last payment 
                            loanDetails.FullPayment = true;

                            $.ajax({
                                type: "POST",
                                url: '/Loan/UpdateLoanPayment',
                                data: { loanDetails: loanDetails },
                                success: function (data) {
                                    if (data.data) {
                                        window.location.href = '/Loan/Index';
                                    }
                                    else {
                                        toastr.error(data.Message);
                                    }
                                }
                            });
                        }
                        else {
                            loanDetails.FullPayment = false;

                            //do we have a a different return date ?
                            if (new Date($('#txtLoanReturnDate').val()) >= new Date($('#txtOldReturnDate').val())) {
                                $.ajax({
                                    type: "POST",
                                    url: '/Loan/UpdateLoanPayment',
                                    data: { loanDetails: loanDetails },
                                    success: function (data) {
                                        if (data.data) {
                                            window.location.href = '/Loan/Index';
                                        }
                                        else {
                                            toastr.error(data.Message);
                                        }
                                    }
                                });
                            }
                            else {
                                toastr.error("Please provide a new return date for the remaining balanace");
                            }
                        }

                    }
                    else if (parseFloat($('#txtPaidAmount').val()) === parseFloat($('#txtNonFormatedLoanReturnAmount').val())) {
                        //this is a good customer - repaying all that that they owe 
                        var loanDetails = {
                            "LoanId": $('#LoanId').val(),
                            "PaidAmount": $('#txtPaidAmount').val(),
                            "ReturnDate": $('#txtLoanReturnDate').val(),
                            "FullPayment": true
                        };

                        $.ajax({
                            type: "POST",
                            url: '/Loan/UpdateLoanPayment',
                            data: { loanDetails: loanDetails },
                            success: function (data) {
                                if (data.data) {
                                    window.location.href = '/Loan/Index';
                                }
                                else {
                                    toastr.error(data.Message);
                                }
                            }
                        });
                    }
                    else {
                        if (parseFloat($('#txtPaidAmount').val()) > parseFloat($('#txtNonFormatedLoanReturnAmount').val())){
                            toastr.error("Attempting to pay more than the return amount is not permitted");
                        }
                        else {

                            //not necessarly a bad client it could be that this customer is making payment before the return date 

                            var loanDetails = {
                                "LoanId": $('#LoanId').val(),
                                "PaidAmount": $('#txtPaidAmount').val(),
                                "ReturnDate": $('#txtLoanReturnDate').val(),
                                "FullPayment": false,
                                "PaymentBeforeSetReturnDate": false,
                                "LoanStatus": $('#ddlLoanStatus').val()
                            };


                            if (new Date($('#txtOldReturnDate').val()) > new Date()) {
                                loanDetails.PaymentBeforeSetReturnDate = true;
                            }

                            //this customer is paying before the actual return date 
                            //if not : bad customer fails to pay atleast what they borrowed

                            //do we have a a different return date ? : NB: This is only for clients that are on their return period and and beyond 
                            if (new Date($('#txtLoanReturnDate').val()) >= new Date($('#txtOldReturnDate').val()) && loanDetails.PaymentBeforeSetReturnDate == false) {
                                if ($('#ddlLoanStatus').val() === "4") {
                                    $.ajax({
                                        type: "POST",
                                        url: '/Loan/UpdateLoanPayment',
                                        data: { loanDetails: loanDetails },
                                        success: function (data) {
                                            if (data.data) {
                                                window.location.href = '/Loan/Index';
                                            }
                                            else {
                                                toastr.error(data.Message);
                                            }
                                        }
                                    });
                                }
                                else {
                                    toastr.error("Please note that the loan status should be Partially Paid");
                                }
                            }
                            else if (loanDetails.PaymentBeforeSetReturnDate == true) {
                                //This is one scenario: Actually a good client - making a payment before their actual return date - status should be kept at active when this kind of payment is made
                                if ($('#ddlLoanStatus').val() === "1") {
                                    loanDetails.ReturnDate = $('#txtOldReturnDate').val(); //chenge of return date is not permitted for the payment done before the actual return date 


                                    $.ajax({
                                        type: "POST",
                                        url: '/Loan/UpdateLoanPayment',
                                        data: { loanDetails: loanDetails },
                                        success: function (data) {
                                            if (data.data) {
                                                window.location.href = '/Loan/Index';
                                            }
                                            else {
                                                toastr.error(data.Message);
                                            }
                                        }
                                    });
                                }
                                else {
                                    toastr.error("For payments before the initial return date the status must remain active")
                                }
                            }
                            else {
                                toastr.error("Please provide a new return date for the remaining balanace");
                            }
                        }
                    }
                }
               
            }
        });
    }
    else {
        //Quit an easy process - We incepting the loan so straight forward process

        if ($('#ddlCustomers').val() == '-1') {
            toastr.error("Please provide customer");
        }
        else if ($('#txtLoanAmount').val() == "") {
            toastr.error("Please provide loan amount");
        }
        else if ($('#txtLoanReturnDate').val() == "") {
            toastr.error("Please provide return date");
        }
        else {
            swal({
                title: "Confirm",
                text: "Are you sure you want to make changes to this loan ?",
                icon: "warning",
                buttons: true,
                showCancelButton: true
            }).then(function (isConfirm) {
                if (isConfirm) {
                    var loanDetais = {
                        'LoanDate': $('#txtLoanDate').val(),
                        'LoanStatus': $('#ddlLoanStatus').val(),
                        'LoanCustomerKey': $('#ddlCustomers').val(),
                        'LoanAmount': $('#txtLoanAmount').val(),
                        'LoanReturnDate': $('#txtLoanReturnDate').val(),
                        'ReturnAmount': $('#txtReturnAmount').val(),
                        'LoanInterest': $('#txtLoanInterest').val()
                    };


                    //post 
                    $.ajax({
                        type: "POST",
                        url: "/Loan/RegisterLoan",
                        data: { loanDetais: loanDetais},
                        success: function (data) {
                            if (data.data) {
                                window.location.href = "/Loan/Index";
                            }
                            else {
                                toastr.error("An error occured while processing your request...");
                            }
                        }
                    });


                }
            });
        }
       
    }
}


function GetStatement() {
    window.location.href = "/Loan/Statements/" + $('#LoanId').val();
}