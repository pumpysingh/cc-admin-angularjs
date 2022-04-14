var apilistApp = angular.module("apilistModule", [])
    .constant('config', {
        
        API_URL: "https://cche-api.azurewebsites.net/api/",
        PYTHON_API_URL: "https://nbserrormodel.azurewebsites.net/api/"
      //  APP_URL:"https://facts-admin.azurewebsites.net/web" //server
    })