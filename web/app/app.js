var adminApp = angular.module('adminApp', ['chatModule','LocalStorageModule', 'apilistModule','Alertify'])
.run(function ($rootScope, $state, $stateParams,localStorageService) {

    // if (location.href.indexOf("https://") == -1) { 
    
    // location.href = location.href.replace("http://", "https://"); 
    // }

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        $rootScope.$state = $state;
        if (toState.authenticate) {
            if (!localStorageService.get('uid')) {
                event.preventDefault();
                $state.go('login');
            } else {
                console.log("user already login");
            }
        } else {
            console.log("authentication : false");
        }
        
    });
    
})