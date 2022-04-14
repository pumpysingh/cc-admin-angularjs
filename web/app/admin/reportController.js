chatModule.controller('reportController',['$scope','chatRequest','$window','config','Alertify','$state','$rootScope', function($scope,chatRequest,$window,config,Alertify,$state,$rootScope){

    $scope.successInvite = false;
    $scope.firstAttempt = true;
    $rootScope.chatloader = false;
    $scope.signupDetails = function(){
        var url = "Mail/send?name=" +$scope.first+ ' ' +$scope.last+ "&email="+$scope.email; 
        
        chatRequest.getRequest(url,"").then(function (data) {
                                
            if(data){ 
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

    $scope.exportCSV = function(){
        $rootScope.chatloader = true;
        if($('input[name="daterange"]').val()){
            var arrayvalues = $('input[name="daterange"]').val().split('-');
            var fromdate = arrayvalues[0].trim();
            var todate = arrayvalues[1].trim();
           
            var url = "Reporting/Filter";
            var d = new Date(fromdate),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            var fromDate = [year, month, day].join('-');


            var tod = new Date(todate),
                tomonth = '' + (tod.getMonth() + 1),
                today = '' + tod.getDate(),
                toyear = tod.getFullYear();

            if (tomonth.length < 2)
                tomonth = '0' + tomonth;
            if (today.length < 2)
                today = '0' + today;

            var toDate = [toyear, tomonth, today].join('-');

            var requestData = { "from": fromDate, "to": toDate };

            chatRequest.sendRequest(requestData, url, "").then(function (data) {
                $rootScope.chatloader = false;
                if (data) {
                    // var a = document.createElement("a");
                    // a.href = 'data:attachment/csv;charset=utf-8,' + encodeURI(data.data);
                    // a.target = '_blank';
                    // a.download = 'Reportingdata.csv';
                    // document.body.appendChild(a);
                    // a.click(); 

                    var dataval = new Blob([data.data], { type: 'text/csv;charset=utf-8' });
                    saveAs(dataval, 'ReportDemographics.csv');
                }
                else {
                    $scope.successMsg = "Something Wrong! Please try Again.";
                }
            },function(err){
                $rootScope.chatloader = false;
                if(err && err.status == 403){
                    $state.go('login');
                }
                else{
                    alertify.alert("No records found!");
                }
            })


            // var processRow = function (row) {
            //     var finalVal = '';
            //     for (var j = 0; j < row.length; j++) {
            //         var innerValue = row[j] === null ? '' : row[j].toString();
            //         if (row[j] instanceof Date) {
            //             innerValue = row[j].toLocaleString();
            //         };
            //         var result = innerValue.replace(/"/g, '""');
            //         if (result.search(/("|,|\n)/g) >= 0)
            //             result = '"' + result + '"';
            //         if (j > 0)
            //             finalVal += ',';
            //         finalVal += result;
            //     }
            //     return finalVal + '\n';
            // };

            // var csvFile = '';
            // for (var i = 0; i < rows.length; i++) {
            //     csvFile += processRow(rows[i]);
            // }

            // var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
            // if (navigator.msSaveBlob) { // IE 10+
            //     navigator.msSaveBlob(blob, filename);
            // } else {
            //     var link = document.createElement("a");
            //     if (link.download !== undefined) { // feature detection
            //         // Browsers that support HTML5 download attribute
            //         var url = URL.createObjectURL(blob);
            //         link.setAttribute("href", url);
            //         link.setAttribute("download", filename);
            //         link.style.visibility = 'hidden';
            //         document.body.appendChild(link);
            //         link.click();
            //         document.body.removeChild(link);
            //     }
            // }
        }
    }

    $scope.exportErrorReportCSV = function(){
        $rootScope.chatloader = true;
        if($('input[name="errordaterange"]').val()){
            var arrayvalues = $('input[name="errordaterange"]').val().split('-');
            var fromdate = arrayvalues[0].trim();
            var todate = arrayvalues[1].trim();
           
            
            var d = new Date(fromdate),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            var fromDate = [year, month, day].join('-');


            var tod = new Date(todate),
                tomonth = '' + (tod.getMonth() + 1),
                today = '' + tod.getDate(),
                toyear = tod.getFullYear();

            if (tomonth.length < 2)
                tomonth = '0' + tomonth;
            if (today.length < 2)
                today = '0' + today;

            var toDate = [toyear, tomonth, today].join('-');

            var url = `CCError?from=${fromDate}&to=${toDate}`;

            chatRequest.getErrorReportRequest(url,"").then(function (data) {
                $rootScope.chatloader = false;
                if (data) {
                    var dataval = new Blob([data.data], { type: 'application/octetstream' });
                    saveAs(dataval, `ZAI Error Analytics CC ${fromDate}-to-${toDate}.xlsx`);
                }
                else {
                    $scope.successMsg = "Something Wrong! Please try Again.";
                }
            },function(err){
                $rootScope.chatloader = false;
                if(err && err.status == 403){
                    $state.go('login');
                }
                else{
                    alertify.alert("No records found!");
                }
            })
        }
    }

    $scope.exportCommentReportCSV = function () {
        $rootScope.chatloader = true;
        if ($('input[name="commentdaterange"]').val()) {
            var arrayvalues = $('input[name="commentdaterange"]').val().split('-');
            var fromdate = arrayvalues[0].trim();
            var todate = arrayvalues[1].trim();


            var d = new Date(fromdate),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            var fromDate = [year, month, day].join('-');


            var tod = new Date(todate),
                tomonth = '' + (tod.getMonth() + 1),
                today = '' + tod.getDate(),
                toyear = tod.getFullYear();

            if (tomonth.length < 2)
                tomonth = '0' + tomonth;
            if (today.length < 2)
                today = '0' + today;

            var toDate = [toyear, tomonth, today].join('-');

            var url = `CommentReportCC?from=${fromDate}&to=${toDate}`;

            chatRequest.getErrorReportRequest(url, "").then(function (data) {
                $rootScope.chatloader = false;
                if (data) {
                    var dataval = new Blob([data.data], { type: 'application/octetstream' });
                    saveAs(dataval, `CC Comments Report ${fromDate}-to-${toDate}.xlsx`);
                }
                else {
                    $scope.successMsg = "Something Wrong! Please try Again.";
                }
            }, function (err) {
                $rootScope.chatloader = false;
                if (err && err.status == 403) {
                    $state.go('login');
                }
                else {
                    alertify.alert("No records found!");
                }
            })
        }
    }

    $scope.exportSomethingElseCommentReportCSV = function () {
        $rootScope.chatloader = true;
        if ($('input[name="somethingelsecommentdaterange"]').val()) {
            var arrayvalues = $('input[name="somethingelsecommentdaterange"]').val().split('-');
            var fromdate = arrayvalues[0].trim();
            var todate = arrayvalues[1].trim();


            var d = new Date(fromdate),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            var fromDate = [year, month, day].join('-');


            var tod = new Date(todate),
                tomonth = '' + (tod.getMonth() + 1),
                today = '' + tod.getDate(),
                toyear = tod.getFullYear();

            if (tomonth.length < 2)
                tomonth = '0' + tomonth;
            if (today.length < 2)
                today = '0' + today;

            var toDate = [toyear, tomonth, today].join('-');

            var url = `SomethingElseReportCC?from=${fromDate}&to=${toDate}`;

            chatRequest.getErrorReportRequest(url, "").then(function (data) {
                $rootScope.chatloader = false;
                if (data) {
                    var dataval = new Blob([data.data], { type: 'application/octetstream' });
                    saveAs(dataval, `CC Something Else Report ${fromDate}-to-${toDate}.xlsx`);
                }
                else {
                    $scope.successMsg = "Something Wrong! Please try Again.";
                }
            }, function (err) {
                $rootScope.chatloader = false;
                if (err && err.status == 403) {
                    $state.go('login');
                }
                else {
                    alertify.alert("No records found!");
                }
            })
        }
    }

}]) 