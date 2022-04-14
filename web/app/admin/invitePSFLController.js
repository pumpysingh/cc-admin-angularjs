chatModule.controller('invitePSFLController',['$scope','chatRequest','$window','config','Alertify','$state', function($scope,chatRequest,$window,config,Alertify,$state){

    $scope.successInvite = false;
    $scope.firstAttempt = true;
    $scope.signupDetails = function(){
        var url = "Mail/send?name=" +$scope.first+ ' ' +$scope.last+ "&email="+$scope.email; 
        
        chatRequest.getRequest(url,"").then(function (data) {
                                
            if(data){
                console.log(data);  
                $scope.successInvite = true;
                $scope.successMsg = "Mail Invitation Sent.";
                $scope.first= "";
                $scope.last="";
                $scope.email = "";
            }
            else{
                $scope.firstAttempt = false;
                $scope.successInvite = true;
                $scope.successMsg = "Something Wrong! Please try Again.";
                $scope.first= "";
                $scope.last="";
                $scope.email = "";
            }
            
        })   
        
    }

    
}]) 