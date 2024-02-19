

function SubmitForm() {
    
    var model = {
        "Username": $("#dc_username").val(),
        "Password": $("#dc_password").val()
    };

    $.ajax({
        type: "POST",
        url: "/Account/SignIn",
        dataType: "json",
        data: {
            model: model
        },
        success: function (data) {
            if (data.success) {
                window.location.href = "/Home/Index";
            }
            else {
                alert("Incorrect Sign in Details");
            }
        }
    });
    return false;
}