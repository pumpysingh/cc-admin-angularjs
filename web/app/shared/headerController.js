adminApp.controller('headerController',['$scope','$rootScope','$state','localStorageService','$timeout', function($scope,$rootScope,$state,localStorageService,$timeout){
    $rootScope.loading = false;
    $rootScope.signin = false;
    $scope.adminName = localStorageService.get("adminName");
    $scope.adminEmail = localStorageService.get("adminEmail");
    if($state.current.name === 'home'){
        $('#chatsec').addClass('active');
        $('#adminadd').removeClass('active');
        $('#inviteadmin').removeClass('active');
        $('#reportsec').removeClass('active');
    }
    else if($state.current.name === 'admin'){
        $('#adminadd').addClass('active');
        $('#chatsec').removeClass('active');
        $('#inviteadmin').removeClass('active');
        $('#reportsec').removeClass('active');
    }
    else if($state.current.name === 'dashboard'){
        $('#reportsec').addClass('active');
        $('#chatsec').removeClass('active');
        $('#inviteadmin').removeClass('active');
        $('#adminadd').removeClass('active');
    }
    else{
        $('#inviteadmin').addClass('active');    
        $('#adminadd').removeClass('active');
        $('#chatsec').removeClass('active');
        $('#reportsec').removeClass('active');
    }
    $scope.logout = function(){
        $rootScope.loading = true;
        $rootScope.signout = true;
        
        localStorageService.remove('uid');
        localStorageService.remove('adminName');
        localStorageService.remove('adminEmail');
        
        $timeout (function() {
            $state.go('login');
        },500)
        
    }
    $('.dropdown-toggle').dropdown();
}])