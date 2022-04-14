chatModule.controller('loginController',['$scope','chatRequest','$window','config','Alertify','$state','localStorageService','$rootScope', function($scope,chatRequest,$window,config,Alertify,$state,localStorageService,$rootScope){

    $rootScope.signout = false;
    $rootScope.loading = false;
    $scope.firstAttempt = true;
    $scope.loginDetails = function(){
        $rootScope.loading = true;
        $rootScope.signin = true;
        
        var url = "AdminUser/check"; 
        var requestData = {"email": $scope.uname, "password": $scope.pwd};
        chatRequest.sendRequest(requestData,url,"").then(function (data) {                    
            if(data.data.status != 'Not matched'){
                localStorageService.set("uid", data.data.user.id);
                
                var name = data.data.user.first + ' ' + data.data.user.last;
                
                localStorageService.set("adminName", name);
                localStorageService.set("adminId", data.data.user.id);
                localStorageService.set("adminEmail", data.data.user.email);
                localStorageService.set("token", data.data.token);
                // $rootScope.adminName = localStorageService.get("adminName");
                // $rootScope.adminEmail = localStorageService.get("adminEmail");
                //var url=config.APP_URL+"#/home";
                $state.go('home');
                // $state.go('dashboard');
                // $window.open(url);
            }
            else{
                $rootScope.loading = false;
				$rootScope.signin = false;
                $scope.firstAttempt = false;
            }
            
        })
        
    }

    
}])    