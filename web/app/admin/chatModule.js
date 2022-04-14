var chatModule = angular.module('chatModule', ['ui.router','Alertify'])
.config(function ($stateProvider, $urlRouterProvider){

    $stateProvider

        .state('login', {

            url:'/login',
            catch: false,
            views: {
                'main@': {
                    templateUrl: "app/admin/login.html",
                    controller: 'loginController'
                }
            },
            authenticate: false

        })

        .state('home', {

            url:'/home',
            catch: false,
            views: {
                'header@': {
                    templateUrl: "app/shared/header.html",
                    controller: 'headerController'
                },
                'main@': {
                    templateUrl: "app/admin/chat.html",
                    controller: 'chatController'
                },
                'footer@': {
                    templateUrl: "app/shared/footer.html",
                    controller: 'footerController'
                }
            },
            authenticate: true

        })
        .state('changepassword', {

            url:'/changepassword',
            catch: false,
            views: {
                'header@': {
                    templateUrl: "app/shared/header.html",
                    controller: 'headerController'
                },
                'main@': {
                    templateUrl: "app/admin/changepassword.html",
                    controller: 'changePasswordController'
                },
                'footer@': {
                    templateUrl: "app/shared/footer.html",
                    controller: 'footerController'
                }
            },
            authenticate: true

        })
        

        .state('admin', {

            url:'/admin',
            catch: false,
            views: {
                'header@': {
                    templateUrl: "app/shared/header.html",
                    controller: 'headerController'
                },
                'main@': {
                    templateUrl: "app/admin/signup.html",
                    controller: 'signupController'
                },
                'footer@': {
                    templateUrl: "app/shared/footer.html",
                    controller: 'footerController'
                }
            },
            authenticate: true

        })
        .state('invite', {

            url:'/invite',
            catch: false,
            views: {
                'header@': {
                    templateUrl: "app/shared/header.html",
                    controller: 'headerController'
                },
                'main@': {
                    templateUrl: "app/admin/invitePSFL.html",
                    controller: 'invitePSFLController'
                },
                'footer@': {
                    templateUrl: "app/shared/footer.html",
                    controller: 'footerController'
                }
            },
            authenticate: true

        })

        .state('dashboard', {

            url:'/dashboard',
            catch: false,
            views: {
                'header@': {
                    templateUrl: "app/shared/header.html",
                    controller: 'headerController'
                },
                'main@': {
                    templateUrl: "app/admin/report.html",
                    controller: 'reportController'
                },
                'footer@': {
                    templateUrl: "app/shared/footer.html",
                    controller: 'footerController'
                }
            },
            authenticate: true

        })

        $urlRouterProvider.otherwise('login');
})
 
