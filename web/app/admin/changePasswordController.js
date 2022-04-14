chatModule.controller('changePasswordController',['$scope','chatRequest','$window','config','Alertify','$state','localStorageService','$rootScope', function($scope,chatRequest,$window,config,Alertify,$state,localStorageService,$rootScope){

    $rootScope.loading = false;
    $rootScope.chatloader = false;
    $scope.changePassword = function(){
        $rootScope.chatloader = true;
        if($scope.newpassword != $scope.confirmpassword){
            $rootScope.chatloader = false;
            alertify.alert("Please check, the new password does not match with confirmed new password");
            return;
        }
        var requestData ={
            email : localStorageService.get("adminEmail"),
            oldpassword : $scope.oldpassword,
            password : $scope.newpassword
        }
        var url = "AdminUser/changepassword";
        chatRequest.sendRequest(requestData,url,"").then(function (data) {
            if(data){
                if(data.data.status != 'Error'){
                    $rootScope.chatloader = false;
                    $scope.oldpassword = "";
                    $scope.newpassword = "";
                    $scope.confirmpassword = "";
                    $('#popover-password').addClass("display_none");
                    alertify.alert("Password changed successfully");
                }
                else{
                    $rootScope.chatloader = false;
                    alertify.alert(data.data.error);
                }
            }
            else{
                $rootScope.chatloader = false;
                alertify.alert("Something went wrong!");
            }
        },function(err){
                $rootScope.chatloader = false;
                console.log("err message ", err);
                if (err && err.status == 403) {
                    $state.go('login');
                }
                else {
                    if (err && err.status == "Error" && err.error) {
                        alertify.alert(err.error);
                    }
                    else {
                        alertify.alert("Something went wrong!");
                    }
                }
        });
        
    }

    $('#newpassword').keyup(function () {
        var password = $('#newpassword').val();
        if (checkStrength(password) == false) {
            $('#changepasswordsubmit').attr('disabled', true);
        }
        else{
            $('#changepasswordsubmit').attr('disabled', false);
        }
    });

    $("#newpassword").blur(function () {
        $('#passwordstrgth').hide();
    });

    $("#newpassword").focus(function () {
        $('#passwordstrgth').show();
    });
    
    function checkStrength(password) {

        var strength = 0;
        //If password contains both lower and uppercase characters, increase strength value.
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
            strength += 1;
            $('.low-upper-case').addClass('text-success');
            $('.low-upper-case i').removeClass('fa-sun').addClass('fa-check');
            $('#popover-password-top').addClass('hide');


        } else {
            $('.low-upper-case').removeClass('text-success');
            $('.low-upper-case i').addClass('fa-sun').removeClass('fa-check');
            $('#popover-password-top').removeClass('hide');
        }

        //If it has numbers and characters, increase strength value.
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
            strength += 1;
            $('.one-number').addClass('text-success');
            $('.one-number i').removeClass('fa-sun').addClass('fa-check');
            $('#popover-password-top').addClass('hide');

        } else {
            $('.one-number').removeClass('text-success');
            $('.one-number i').addClass('fa-sun').removeClass('fa-check');
            $('#popover-password-top').removeClass('hide');
        }

        //If it has one special character, increase strength value.
        if (password.match(/([!,%,&,@@,#,$,^,*,?,_,~])/)) {
            strength += 1;
            $('.one-special-char').addClass('text-success');
            $('.one-special-char i').removeClass('fa-sun').addClass('fa-check');
            $('#popover-password-top').addClass('hide');

        } else {
            $('.one-special-char').removeClass('text-success');
            $('.one-special-char i').addClass('fa-sun').removeClass('fa-check');
            $('#popover-password-top').removeClass('hide');
        }

        if (password.length > 0) {
            $('#popover-password').removeClass('display_none');
        }

        if (password.length == 0) {
            $('#popover-password').addClass('display_none');
            $('#result').removeClass();
            $('#password-strength').addClass('progress-bar-danger');
            $('#password-strength').css('width', '0%');
        }
        if (password.length > 7) {
            strength += 1;
            $('.eight-character').addClass('text-success');
            $('.eight-character i').removeClass('fa-sun').addClass('fa-check');
            $('#popover-password-top').addClass('hide');

        } else {
            $('.eight-character').removeClass('text-success');
            $('.eight-character i').addClass('fa-sun').removeClass('fa-check');
            $('#popover-password-top').removeClass('hide');
        }
        // If value is less than 2

        if (strength == 0) {
            $('#result').removeClass()
            $('#password-strength').addClass('progress-bar-danger');
            $('#result').addClass('text-danger').text('Very Weak');
            $('#password-strength').css('width', '10%');
            return false
        }
        if (strength == 1) {
            $('#result').removeClass()

            $('#password-strength').addClass('progress-bar-danger');
            $('#result').addClass('text-danger').text('Very Weak');
            $('#password-strength').css('width', '10%');
            return false
        }

        else if (strength == 2) {
            $('#result').addClass('good');
            $('#password-strength').removeClass('progress-bar-danger');
            $('#password-strength').addClass('progress-bar-warning');
            $('#result').addClass('text-warning').text('Weak')
            $('#password-strength').css('width', '60%');
            return false
        } else if (strength == 4) {
            $('#result').removeClass()
            $('#result').addClass('strong');
            $('#password-strength').removeClass('progress-bar-warning');
            $('#password-strength').addClass('progress-bar-success');
            $('#result').addClass('text-success').text('Strong');
            $('#password-strength').css('width', '100%');
            return true
        }
    }

    $('#confirmpassword').keyup(function() {
        if ($('#confirmpassword').val() !== "" && $('#newpassword').val() !== $('#confirmpassword').val()) {
            $('#popover-cpassword').removeClass('hide');
        } else {
            $('#popover-cpassword').addClass('hide');
        }
    });
}])