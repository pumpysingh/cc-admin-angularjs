adminApp.service('chatRequest', function ($http, $q, config, $rootScope, localStorageService) {

    this.url = config.API_URL;
    this.pythonURL = config.PYTHON_API_URL;

    this.getRequest = function (url, headers) {
        $rootScope.chatloader = true;
        if(headers == undefined || headers == "undefined" || headers == "" || headers == null){
            headers = {};
        }
        if(localStorageService.get('token')){
            headers.authorization = localStorageService.get('token');
        }
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: this.url + url,
            //url:url,
            headers: headers
        }).success(function (data, status, headers, config) {
            var results = [];
            results.data = data;
            results.headers = headers;
            results.status = status;
            results.config = config;
            if (status == 200) {
                $rootScope.status = 200;
            }
            $rootScope.chatloader = false;
            deferred.resolve(results);
        }).error(function (data, status, headers) {
            console.log(status);
            $rootScope.status = status;
            if (status == 503 || status == 403 || status == 504 || status == 500) {
                // $rootScope.focusInput = true;
                // alertify.alert('Something is not right,please reenter the last message!');
                if(status == 403){
                    data.status= status;
                }
            }
            $rootScope.chatloader = false;
            deferred.reject(data, status);
        });
        return deferred.promise;
    };

    this.sendRequest = function (requestdata, url, header) {
        if(header == undefined || header == "undefined" || header == "" || header == null){
            header = {};
        }
        $rootScope.chatloader = true;
        if(localStorageService.get('token')){
            header.authorization = localStorageService.get('token');
        }
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: this.url + url,
            data: requestdata,
            headers: header
        }).success(function (data, status, headers, config) {
            var results = [];
            results.data = data;
            results.headers = headers;
            results.status = status;
            results.config = config;
            if (status == 200) {
                $rootScope.status = 200;
            }
            $rootScope.chatloader = false;
            deferred.resolve(results);
        }).error(function (data, status, headers) {

            $rootScope.status = status;
            if (status == 503 || status == 403 || status == 504 || status == 500) {
                // alert();
                if(status == 403){
                    data.status= status;
                }
            }
            $rootScope.chatloader = false;
            deferred.reject(data, status);
        });
        return deferred.promise;
    };


    this.updateRequest = function (requestdata, url, header) {
        if(header == undefined || header == "undefined" || header == "" || header == null){
            header = {};
        }
        $rootScope.chatloader = true;
        if(localStorageService.get('token')){
            header.authorization = localStorageService.get('token');
        }
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: this.url + url,
            data: requestdata,
            headers: header
        }).
            success(function (data, status, headers, config) {
                var results = [];
                results.data = data;
                results.headers = headers;
                results.status = status;
                results.config = config;
                // any required additional processing here
                $rootScope.chatloader = false;
                deferred.resolve(data);
            }).
            error(function (data, status) {
                if(status == 403){
                    data.status= status;
                }
                $rootScope.chatloader = false;
                deferred.reject(data, status);
            });
        return deferred.promise;
    };

    this.getErrorReportRequest = function (url, headers) {
        $rootScope.chatloader = true;
        if(headers == undefined || headers == "undefined" || headers == "" || headers == null){
            headers = {};
        }
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: this.pythonURL + url,
            headers: headers,
            responseType: 'arraybuffer'
        }).success(function (data, status, headers, config) {
            var results = [];
            results.data = data;
            results.headers = headers;
            results.status = status;
            results.config = config;
            if (status == 200) {
                $rootScope.status = 200;
            }
            $rootScope.chatloader = false;
            deferred.resolve(results);
        }).error(function (data, status, headers) {
            console.log(status);
            $rootScope.status = status;
            if (status == 503 || status == 403 || status == 504 || status == 500) {
                if(status == 403){
                    data.status= status;
                }
            }
            $rootScope.chatloader = false;
            deferred.reject(data, status);
        });
        return deferred.promise;
    };
});