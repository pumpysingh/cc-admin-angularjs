chatModule.controller('signupController',['$scope','chatRequest','$window','config','Alertify','$state', function($scope,chatRequest,$window,config,Alertify,$state){

    console.log('Signup Controller');
    
    $scope.pwdCheck = true;
    $scope.$watch('cpwd',function(newval,oldval){
        
        if(newval == $scope.pwd){
            $scope.firstAttempt = true;
        }
        else{
            $scope.firstAttempt = false;   
        }
    
    })
    
    $scope.firstAttempt = true;
    $scope.signupDetails = function(){
        var url = "AdminUser/create"; 
        var requestData = {"first": $scope.first, "last": $scope.last, "email": $scope.uname, "password": $scope.pwd, "role": "admin"};
        
        chatRequest.sendRequest(requestData,url,"").then(function (data) {
                                
            if(data){
                alert(data);  
                console.log(data);  
                //var url=config.APP_URL+"#/home";
                $state.go('login');
                // $window.open(url);
                $scope.successInvite = true;
                $scope.successMsg = "New Admin Successfuly Added.";
            }
            else{
                $scope.firstAttempt = false;
                $scope.successInvite = true;
                $scope.successMsg = "Something Wrong! Please try Again.";
            }
            
        },function(err){
            if(err && err.status == 403){
                $state.go('login');
            }
            else{
                alertify.alert("No records found!");
            }
        })   
        
    }

    
}]) 