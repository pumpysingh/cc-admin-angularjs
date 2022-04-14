chatModule.controller('chatController', ['$scope', 'chatRequest', 'Alertify', '$sce', 'localStorageService', '$timeout', '$rootScope', '$state', function ($scope, chatRequest, Alertify, $sce, localStorageService, $timeout, $rootScope, $state) {

    var total;
    var page = 1;
    var pages;
    $scope.name = 'NA';
    $scope.pbtdis = false;
    $scope.nbtdis = false;
    $scope.arcbtn = false;
    $scope.chats = [];
    $rootScope.chatloader = false;

    $scope.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        
        return color;
      }
    
    var url = "messagedata?page=" + page + "&limit=10";
    chatRequest.getRequest(url, "").then(function (data) {
        if (data) {

            total = data.data.total;
            page = data.data.page;
            pages = data.data.pages;
            if (page === pages) {
                $scope.nbtdis = false;
                $scope.pbtdis = false;
            }
            else {
                $scope.nbtdis = true;
            }

            if (data.data.docs) {
                if (data.data.docs.length > 0) {

                    for (var i = 0; i < data.data.docs.length; i++) {
                        var chat = {};
                       
                        if(data.data.docs[i].fname || data.data.docs[i].lname){
                            
                            chat.fname = data.data.docs[i].fname;
                            // chat.lname = data.data.docs[i].lname;
                            // chat.logo = chat.fname.charAt(0)+chat.lname.charAt(0);
                            chat.logo = chat.fname.charAt(0);
                            //$scope.name = chat.fname+' '+chat.lname;
                        }else{
                           
                            chat.fname = 'NA';
                            chat.lname = "";
                            chat.logo = 'NA';
                            //$scope.name = "NA";
                            
                        }
                        chat.errorcount = data.data.docs[i].errorcount;
                        chat.id = data.data.docs[i].conversationid;
                        if(data.data.docs[i].phone){
                            chat.phone = data.data.docs[i].phone;     
                        }
                        else{
                            chat.phone = 'NA'
                        }  
                        // chat.createdAt = moment(data.data.docs[i].createdAt).format('MM/DD/YY hh:mm:ss a');
                        chat.createdAt = moment.utc(data.data.docs[i].createdAt).tz("America/New_York").format('MM/DD/YY hh:mm:ss a');
                        chat.color = $scope.getRandomColor();
                        $scope.chats.push(chat);
                    }
                }
                else {
                    alertify.alert("No records found!");
                }
            }
            else {
                alertify.alert("No records found!");
            }
        }
        else {
            alertify.alert("No records found!");
        }
    },function(err){
        if(err && err.status == 403){
            $state.go('login');
        }
        else{
            alertify.alert("No records found!");
        }
    })


    $scope.prevButton = function () {
        if (page == 1 || pages == 1) {
            
            $scope.pbtdis = false;
            if (pages > 1) {
                
                $scope.nbtdis = true;

            } else {
                $scope.nbtdis = false;
            }

        }
        else {
            
            page = page - 1;
            $scope.pbtdis = false;
            if(pages >1){
                if(page > 1){
                    
                    $scope.pbtdis = true;
                }
                else{
                    $scope.pbtdis = false;
                }
                $scope.nbtdis = true;
            }
            else{
                $scope.nbtdis = false;
            }
            for(var i=0; i<indexs.length; i++){
                $("#conId-" + (indexs[i])).removeClass("active");
            }
            $scope.chatDetails = [];
            var url = "messagedata?page=" + page + "&limit=10";
            chatRequest.getRequest(url, "").then(function (data) {
                if (data) {

                    total = data.data.total;
                    page = data.data.page;
                    pages = data.data.pages;
                    if (page === pages) {
                        $scope.nbtdis = true;
                        $scope.pbtdis = false;
                    }

                    if (data.data.docs) {
                        if (data.data.docs.length > 0) {
                            $scope.chats = [];
                            for (var i = 0; i < data.data.docs.length; i++) {
                                var chat = {};
                                if(data.data.docs[i].fname || data.data.docs[i].lname){
                            
                                    chat.fname = data.data.docs[i].fname;
                                    // chat.lname = data.data.docs[i].lname;
                                    // chat.logo = chat.fname.charAt(0)+chat.lname.charAt(0);
                                    chat.logo = chat.fname.charAt(0);
                                    //$scope.name = chat.fname+' '+chat.lname;
                                }else{
                                   
                                    chat.fname = 'NA';
                                    chat.lname = "";
                                    chat.logo = 'NA';
                                    //$scope.name = 'NA';
                                    
                                }
                                chat.id = data.data.docs[i].conversationid;
                                chat.errorcount = data.data.docs[i].errorcount;
                                if(data.data.docs[i].phone){
                                    chat.phone = data.data.docs[i].phone;     
                                }
                                else{
                                    chat.phone = 'NA'
                                }    
                                chat.createdAt = moment(data.data.docs[i].createdAt).format('MM/DD/YY hh:mm:ss a');
                                chat.color = $scope.getRandomColor();
                                $scope.chats.push(chat);
                            }
                        }
                        else {
                            alertify.alert("No records found!");
                        }
                    }
                    else {
                        alertify.alert("No records found!");
                    }
                }
                else {
                    alertify.alert("No records found!");
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

    }

    $scope.nextButton = function () {
        if (page === pages) {
            $scope.nbtdis = false;
            $scope.pbtdis = false;
        }
        else {
            
           if(page >= 1){
            
            $scope.pbtdis = true;
           }
           if(pages > 1){
                $scope.nbtdis = true;
            }
            //$scope.pbtdis = true;
            page = page + 1;
            if (page === pages) {
                $scope.nbtdis = false;
                $scope.pbtdis = true;
            }
            for(var i=0; i<indexs.length; i++){
                $("#conId-" + (indexs[i])).removeClass("active");
            }
            $scope.chatDetails = [];
            var url = "messagedata?page=" + page + "&limit=10";
            chatRequest.getRequest(url, "").then(function (data) {
                if (data) {

                    total = data.data.total;
                    page = data.data.page;
                    pages = data.data.pages;

                    if (data.data.docs) {
                        if (data.data.docs.length > 0) {
                            $scope.chats = [];
                            for (var i = 0; i < data.data.docs.length; i++) {
                                var chat = {};
                                if(data.data.docs[i].fname || data.data.docs[i].lname){
                            
                                    chat.fname = data.data.docs[i].fname;
                                    // chat.lname = data.data.docs[i].lname;
                                    // chat.logo = chat.fname.charAt(0)+chat.lname.charAt(0);
                                    chat.logo = chat.fname.charAt(0);
                                    // $scope.name = chat.fname+' '+chat.lname;
                                }else{
                                   
                                    chat.fname = 'NA';
                                    chat.lname = "";
                                    chat.logo = 'NA';
                                    // $scope.name = 'NA';
                                    
                                }
                                chat.errorcount = data.data.docs[i].errorcount;
                                chat.id = data.data.docs[i].conversationid;
                                if(data.data.docs[i].phone){
                                    chat.phone = data.data.docs[i].phone;     
                                }
                                else{
                                    chat.phone = 'NA'
                                }  
                                chat.createdAt = moment(data.data.docs[i].createdAt).format('MM/DD/YY hh:mm:ss a');
                                chat.color = $scope.getRandomColor();
                                $scope.chats.push(chat);
                            }
                        }
                        else {
                            alertify.alert("No records found!");
                        }
                    }
                    else {
                        alertify.alert("No records found!");
                    }
                }
                else {
                    alertify.alert("No records found!");
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

    }
    var indexs = [];
    $scope.chatMsg = function (convid, date, name,index) {
       
        
        indexs.push(index);
        
        if(indexs.length > 1){
            
            for(var i=0; i<indexs.length-1; i++){
                $("#conId-" + (indexs[i])).removeClass("active");
            }
        }
        $("#conId-" + (index)).addClass("active");
        $scope.arcbtn = true;
        $scope.chatDetails = [];
        $scope.convid = convid;
        $scope.date = date;
        var updateddate = new Date(date);
        var dd = updateddate.getDate();
        var mm = updateddate.getMonth() + 1;
        var yyyy = updateddate.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        $scope.fdate = mm + '/' + dd + '/' + yyyy;
        // $scope.fdate = $filter('date')([$scope.date, "MM/dd/yy"]);
        $scope.name = name;

        var url = "MessageData/GetMessages/" + convid;
        chatRequest.getRequest(url, "").then(function (data) {
            if (data) {
                if (data.data.MessageData) {
                    if (data.data.MessageData.length > 0) {
                        
                        // if(data.data.MessageData[2]){
                        //     $scope.hname = data.data.MessageData[2].text;
                        // }
                        // else{
                        //     $scope.hname = 'NA';
                        // }
                        var mdata = data.data.MessageData;
                        angular.forEach(data.data.MessageData, function (value, key) {
                           
                            if(/\n/.test(value.text)){
                               
                                value.text=value.text.replace(new RegExp('\n', 'g'),'<br>');
                                
                            }

                            
                                var chatDetail = {};
                                if (!value.text) {
                                    chatDetail.text = null;
                                } else {

                                    chatDetail.text = value.text;
                                }

                                if(value.msg_reprompt === true){
                                    
                                    $scope.identify = true;
                                    
                                    $timeout(function(){
                                        $("#objectchat-" + (key-1)).addClass("ide");
                                        $( "#chatHL-"+ (key-1) ).append('<span class="pulse1"><i class="fa fa-circle misdoteff" style=" padding-left: 5px;"></i></span>');

                                    },50)
                                   //$("#objectchat-" + (key-1)).addClass("ide");
                                   
                                }
                                else{
                                    $scope.identify = false;
                                }

                                if(/\[/.test(chatDetail.text) && /\(/.test(chatDetail.text)){       
                                    var index=0;
        
                                    while(index!=-1)
                                    {
                                    var n1 = chatDetail.text.indexOf("[", index);
                                    var n2 = chatDetail.text.indexOf("]", n1);
                                    var n3 = chatDetail.text.indexOf("(", n2);
                                    var n4 = chatDetail.text.indexOf(")", n3);
                                    if(n1!=-1 && n2!=-1 && n3!=-1 && n4!=-1){
                                        if(n1<n2 && n2<n3 && n3 < n4)
                                        {
                                            if(n3==n2+1)
                                            {
                                                var dispayname = chatDetail.text.slice(n1+1, n2);
                                                var link =chatDetail.text.slice(n3+1, n4);
                                                var oldstringportion= chatDetail.text.slice(n1, n4+1);
                                                var Sdispayname = chatDetail.text.slice(n1, n2+1);
                                                var Slink = chatDetail.text.slice(n3, n4+1);
                                                
                                                var newstringportion= '<a style="color: #76c8ec; text-decoration: underline;" href= "' + link + '" target=_blank>' + dispayname + '</a>';
                                                chatDetail.text=chatDetail.text.replace(oldstringportion,newstringportion);
                                                
                                            }
                                            else{
                                                index=n2;
                                                
                                            }
                                        }
                                        else{
                                            index=n4;
                                            
                                        }
                                    }
                                    else{
                                        index=-1;
                                    }
                                    }    
                                }    
                                   
                                chatDetail.text = $sce.trustAsHtml(chatDetail.text); 
                                chatDetail.sender = value.sender;
                                chatDetail.cid = value.conversationid;
                                localStorageService.set("chatCID",  chatDetail.cid);
                                chatDetail.msgtype = value.msgtype;
                                
                                if (value.msgtype === 'application/vnd.microsoft.keyboard' || value.msgtype === 'application/vnd.microsoft.card.hero') {
                                   
                                    if (value.attachments[0].content.buttons) {
                                        var btns = [];
                                        for (var l = 0; l < value.attachments[0].content.buttons.length; l++) {
                                            var btn = {};
                                            btn.btn = value.attachments[0].content.buttons[l].title;
                                            // if(btn.btn.length > 90){
                                            //     alert();
                                            //     sendmessage1 = btn.btn.slice(NaN,90);
                                            //     sendmessage2 = btn.btn.slice(90,120);
                                            //     btn.btn = sendmessage1 + '<br>' +sendmessage2;
                                            //     btn.btn = $sce.trustAsHtml(btn.btn);
                                            // }
                                            if(/\[/.test(btn.btn) && /\(/.test(btn.btn)){       
                                                let index=0;
                    
                                                while(index!=-1)
                                                {
                                                let n1 = btn.btn.indexOf("[", index);
                                                let n2 = btn.btn.indexOf("]", n1);
                                                let n3 = btn.btn.indexOf("(", n2);
                                                let n4 = btn.btn.indexOf(")", n3);
                                                if(n1!=-1 && n2!=-1 && n3!=-1 && n4!=-1){
                                                    if(n1<n2 && n2<n3 && n3 < n4)
                                                    {
                                                        if(n3==n2+1)
                                                        {
                                                            let dispayname = btn.btn.slice(n1+1, n2);
                                                            let link =btn.btn.slice(n3+1, n4);
                                                            let oldstringportion= btn.btn.slice(n1, n4+1);
                                                            let Sdispayname = btn.btn.slice(n1, n2+1);
                                                            let Slink = btn.btn.slice(n3, n4+1);
                                                            
                                                            let newstringportion= '<a style="color: #76c8ec; text-decoration: underline;" href= "' + link + '" target="_blank" class="btn btn-green btn-sm">' + dispayname + '</a>';
                                                            btn.btn=btn.btn.replace(oldstringportion,dispayname);
                                                        }
                                                        else{
                                                            index=n2;
                                                            
                                                        }
                                                    }
                                                    else{
                                                        index=n4;
                                                        
                                                    }
                                                }
                                                else{
                                                    index=-1;
                                                }
                                                }    
                                            }
                                            
                                            btns.push(btn);
                                             
                                        }
                                        chatDetail.btns = btns;
                                    }
                                }
                                else{
                                    if(value.channeldata && value.channeldata.type == "buttonwithlink"){
                                        chatDetail.BtnText = value.channeldata.Text;
                                        chatDetail.BtnLink = value.channeldata.link;
                                        chatDetail.type = value.channeldata.type;
                                    }
                                    else if(value.channeldata && value.channeldata.type == "showscreengrab"){
                                        chatDetail.imageLink = value.channeldata.link;
                                        chatDetail.type = value.channeldata.type;
                                    }
                                    else if(value.channeldata && value.channeldata.type == "showcontinuebtn"){
                                        chatDetail.text = "Continue Chat"
                                        chatDetail.type = "showcontinuebtn";
                                    }
                                }
                                $scope.chatDetails.push(chatDetail);      
                            
                        })

                    }
                    else {
                        alertify.alert("No record found!");
                    }
                }
                else {
                    alertify.alert("No record found!");
                }
            }
            else {
                alertify.alert("No record found!");
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

    $scope.archiveChat = function (cid) {
        
        var acid = cid;
        alertify.confirm("This will remove selected chat. Are you sure?");
        $('#alertify-ok').bind('click', function () {
           
            //Do operation after clicking ok button.
            var url = "Conversation/updatestatus/" + acid + "?status=archive";
            chatRequest.getRequest(url, "").then(function (data) {

                if (data) {
                    
                    
                    if(acid == localStorageService.get("chatCID")){
                        $scope.arcbtn = false;
                        $scope.chatDetails = [];
                    }

                    


                    for (var i = 0; i < $scope.chats.length; i++) {
                        
                        if ($scope.chats[i].id === acid) {
                            
                            //$scope.chats.remove(i);
                            $scope.chats.splice(i, 1);


                       if(page !== pages){   
                           
                            var url = "messagedata?page=" + page + "&limit=10";
                            
                            chatRequest.getRequest(url, "").then(function (data) {

                                if (data) {
                                    
                                    total = data.data.total;
                                    page = data.data.page;
                                    pages = data.data.pages;
                                   
                                    if (page == pages) {
                                        $scope.nbtdis = false;
                                        $scope.pbtdis = false;
                                    }
                                    else {
                                        if(page < pages){
                                            $scope.nbtdis = true;
                                        }
                                        else{
                                            $scope.nbtdis = false;
                                        }
                                        
                                    }
                                    $scope.chats2 = [];
                                    if (data.data.docs) {
                                        
                                        if (data.data.docs.length > 0) {

                                            for (var i = 0; i < data.data.docs.length; i++) {
                                                var chat = {};
                                            
                                                if(data.data.docs[i].fname || data.data.docs[i].lname){
                                                    
                                                    chat.fname = data.data.docs[i].fname;
                                                    // chat.lname = data.data.docs[i].lname;
                                                    // chat.logo = chat.fname.charAt(0)+chat.lname.charAt(0);
                                                    chat.logo = chat.fname.charAt(0);
                                                    //$scope.name = chat.fname+' '+chat.lname;
                                                }else{
                                                
                                                    chat.fname = 'NA';
                                                    chat.lname = "";
                                                    chat.logo = 'NA';
                                                    //$scope.name = "NA";
                                                    
                                                }
                                                chat.errorcount = data.data.docs[i].errorcount;
                                                chat.id = data.data.docs[i].conversationid;
                                                if(data.data.docs[i].phone){
                                                    chat.phone = data.data.docs[i].phone;     
                                                }
                                                else{
                                                    chat.phone = 'NA'
                                                }  
                                                chat.createdAt = moment(data.data.docs[i].createdAt).format('MM/DD/YY hh:mm:ss');
                                                chat.color = $scope.getRandomColor();
                                                $scope.chats2.push(chat);
                                                
                                            }
                                            //$scope.chats = angular.merge($scope.chats, $scope.chats2);
                                            $scope.chats.push( $scope.chats2[9]);
                                            
                                        }
                                    }
                                }
                                else {

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

                        }
                    }

                }
                
                else {

                }

            },function(err){
                if(err && err.status == 403){
                    $state.go('login');
                }
                else{
                    alertify.alert("No records found!");
                }
            })


        });

        $('#alertify-cancel').bind('click', function () {

        });

    }


     //Chat Download
     $scope.download = function (convid) {
         var bodyData = [];
        var url = "MessageData/GetMessages/" + convid;
         chatRequest.getRequest(url, "").then(function (data) {
             if (data) {
                 if (data.data.MessageData) {
                     if (data.data.MessageData.length > 0) {
                         var obj = data.data.MessageData;

                         var chatcontent = {
                             content: [], styles: {
                                 leftStyle: {

                                     alignment: 'left'
                                 },
                                 rightStyle: {
                                     color: "#1b5ca5",
                                     alignment: 'left'
                                     //alignment: 'right'
                                 },
                                 rightStyle2: {
                                     color: "#778191",
                                     alignment: 'left'
                                     //alignment: 'right'
                                 },
                                 colorred: {
                                     color: '#119c55'
                                 },
                                 colorgreen: {
                                     fontSize: 11,
                                     color: '#51617c',
                                     alignment: 'justify',

                                 },
                                 blanklinestyle: {
                                     fontSize: 6,
                                 },
                                 tableExample: {
                                     margin: [0, 5, 0, 15],
                                     color: '#777777'
                                 },
                                 header: {
                                     fontSize: 18,
                                     bold: true,
                                     margin: [0, 0, 0, 10],
                                     color: "#15549a",
                                     alignment: 'center'
                                 },
                             }, header: function (currentPage, pageCount) {
                                return {
                                    margin: 10,
                                    columns: [
                                        {
                                            fontSize: 9,
                                            text: [
                                                {
                                                    text: "Nelnet - Chat Transcript"
                                                }
                                            ],
                                            alignment: 'right'
                                        }
                                    ]
                                };
                            }, footer: function (currentPage, pageCount) {
                                return {
                                    margin: 10,
                                    columns: [
                                        {
                                            fontSize: 9,
                                            text: [
                                                {
                                                    text: currentPage.toString() + ' of ' + pageCount
                                                }
                                            ],
                                            alignment: 'right'
                                        },
                                        {
                                            fontSize: 9,
                                            text: $scope.fdate +"(EST)",
                                            alignment: 'right'
                                        }
                                    ]
                                };
                            }
                         };


                         chatcontent.content.push({ text: "Nelnet", style: 'header' },);
                         var reg = new RegExp('([a-zA-Z\d]+://)?((\w+:\w+@)?([a-zA-Z\d.-]+\.[A-Za-z]{2,4})(:\d+)?(/.*)?)', 'i')
                         //chatcontent.content.push({text: $scope.fdate, alignment: 'right'},{text:'                                ',style:'blanklinestyle'});
                         angular.forEach(obj, function (value, key) {
                             if (obj[key].attachments && obj[key].attachments.length > 0 && obj[key].attachments[0].content && obj[key].attachments[0].content.buttons) {

                                 if (obj[key].sender == "xander") {

                                     var b = obj[key].text + '\r\n';
                                     var i = 0;
                                     angular.forEach(obj[key].attachments[0].content.buttons, function (v, k) {
                                         b = b + v.title + '\r\n';
                                         i++;
                                     }),
                                         //alert(obj[key].buttons.title);
                                         chatcontent.content.push({
                                             columns: [

                                                 {
                                                     // star-sized columns fill the remaining space
                                                     // if there's more than one star-column, available width is divided equally
                                                     width: 'auto',
                                                     text: "Bailey" + ': ',
                                                     style: 'colorred'
                                                 },
                                                 {
                                                     // star-sized columns fill the remaining space
                                                     // if there's more than one star-column, available width is divided equally
                                                     width: 'auto',
                                                     text: b,
                                                     style: 'colorgreen',
                                                     bold: true
                                                 },


                                             ],
                                             style: 'leftStyle',

                                             // optional space between columns
                                             columnGap: 10
                                         }, { text: '                                ', style: 'blanklinestyle' })

                                 } else {
                                     chatcontent.content.push({
                                         columns: [
                                             {
                                                 // auto-sized columns have their widths based on their content
                                                 width: 'auto',
                                                 text: 'You: ',
                                                 style: 'rightStyle',
                                             },
                                             {
                                                 // auto-sized columns have their widths based on their content
                                                 width: 'auto',
                                                 text: value.text,
                                                 style: 'rightStyle2',

                                             }

                                         ],
                                         style: 'rightStyle',
                                         // optional space between columns
                                         columnGap: 20
                                     }, { text: '                                ', style: 'blanklinestyle' })

                                 }
                             }
                             else {
                                 if (obj[key].sender == "xander") {
                                     if (obj[key].msgtype === "endOfConversation") {
                                         //obj[key].message = "Conversation Ended."
                                     } else {
                                         if (obj[key].channeldata && obj[key].channeldata.type == "showscreengrab") {
                                             console.log("Show Screen Grab Block ", obj[key].channeldata.type);
                                             console.log("Link ", obj[key].channeldata.link);
                                             var b = obj[key].text + '\r\n';
                                             b = b + obj[key].channeldata.link + '\r\n';

                                             chatcontent.content.push({
                                                 columns: [

                                                     {
                                                         // star-sized columns fill the remaining space
                                                         // if there's more than one star-column, available width is divided equally
                                                         width: 'auto',
                                                         text: "Bailey" + ': ',
                                                         style: 'colorred'
                                                     },
                                                     {
                                                         // star-sized columns fill the remaining space
                                                         // if there's more than one star-column, available width is divided equally
                                                         width: 'auto',
                                                         text: b,
                                                         style: 'colorgreen',
                                                     },


                                                 ],
                                                 style: 'leftStyle',

                                                 // optional space between columns
                                                 columnGap: 10
                                             }, { text: '                                ', style: 'blanklinestyle' })
                                         }
                                         else if (obj[key].channeldata && obj[key].channeldata.type == "buttonwithlink") {
                                             console.log("Show Screen Grab Block ", obj[key].channeldata.type);
                                             console.log("Link ", obj[key].channeldata.link);
                                             console.log("Link Text ", obj[key].channeldata.Text);
                                             var b = obj[key].text + '\r\n';
                                             b = b + obj[key].channeldata.Text + "(" + obj[key].channeldata.link + ")" + '\r\n';

                                             chatcontent.content.push({
                                                 columns: [

                                                     {
                                                         // star-sized columns fill the remaining space
                                                         // if there's more than one star-column, available width is divided equally
                                                         width: 'auto',
                                                         text: "Bailey" + ': ',
                                                         style: 'colorred'
                                                     },
                                                     {
                                                         // star-sized columns fill the remaining space
                                                         // if there's more than one star-column, available width is divided equally
                                                         width: 'auto',
                                                         text: b,
                                                         style: 'colorgreen',
                                                         bold: true
                                                     },


                                                 ],
                                                 style: 'leftStyle',

                                                 // optional space between columns
                                                 columnGap: 10
                                             }, { text: '                                ', style: 'blanklinestyle' })
                                         }
                                         else if (obj[key].channeldata && obj[key].channeldata.type == "showcontinuebtn") {
                                            var alignment = ''
                                            var bd = ["Continue Chat"];
                                            bodyData.push(bd);
                                            chatcontent.content.push({
                                                columns: [
                                                    {
                                                        // star-sized columns fill the remaining space
                                                        // if there's more than one star-column, available width is divided equally
                                                        width: 'auto',
                                                        text: "Bailey" + ': ',
                                                        style: 'colorred'
                                                    },
                                                    {
                                                        // star-sized columns fill the remaining space
                                                        // if there's more than one star-column, available width is divided equally
                                                        width: 480,
                                                        style: 'colorgreen',
                                                        text: "Continue Chat",
                                                        bold: true,
                                                        alignment:alignment
                                                    },
                    
                    
                                                ],
                                                style: 'leftStyle',
                    
                                                // optional space between columns
                                                columnGap: 10
                    
                                            }, { text: '                                ', style: 'blanklinestyle' })
                                        }
                                         else {
                                            var alignment = 'justify'
                                            if (reg.test(value.text)) {
                                                alignment = '';
                                            }
                                             var bd = [value.text];
                                             bodyData.push(bd);
                                             chatcontent.content.push({
                                                 columns: [

                                                     {
                                                         // star-sized columns fill the remaining space
                                                         // if there's more than one star-column, available width is divided equally
                                                         width: 'auto',
                                                         text: "Bailey" + ': ',
                                                         style: 'colorred'
                                                     },
                                                     {
                                                         // star-sized columns fill the remaining space
                                                         // if there's more than one star-column, available width is divided equally
                                                         width: 'auto',
                                                         style: 'colorgreen',
                                                         text: value.text,
                                                         alignment: alignment
                                                     },


                                                 ],
                                                 style: 'leftStyle',

                                                 // optional space between columns
                                                 columnGap: 10

                                             }, { text: '                                ', style: 'blanklinestyle' })
                                         }
                                     }
                                 }
                                 else {
                                     chatcontent.content.push({
                                         columns: [
                                             {
                                                 // auto-sized columns have their widths based on their content
                                                 width: 'auto',
                                                 text: 'You: ',
                                                 style: 'rightStyle',
                                             },
                                             {
                                                 // auto-sized columns have their widths based on their content
                                                 width: 'auto',
                                                 text: value.text.toString(),
                                                 style: 'rightStyle2',

                                             }

                                         ],
                                         style: 'rightStyle',
                                         // optional space between columns
                                         columnGap: 20
                                     }, { text: '                                ', style: 'blanklinestyle' })

                                 }
                             }
                         })



                         for (var i = 0; i < chatcontent.content.length; i++) {
                             if (chatcontent.content[i].columns) {

                                 if (/<br>/.test(chatcontent.content[i].columns[1].text)) {
                                     chatcontent.content[i].columns[1].text = chatcontent.content[i].columns[1].text.replace(new RegExp('<br>', 'g'), '\r\n');
                                 }
                                 else { }
                                 if ((/</.test(chatcontent.content[i].columns[1].text) && />/.test(chatcontent.content[i].columns[1].text)) || /<\/a>/.test(chatcontent.content[i].columns[1].text)) {
                                     chatcontent.content[i].columns[1].text = chatcontent.content[i].columns[1].text.replace(new RegExp('</a>', 'g'), '');
                                     var index = 0;
                                     while (index != -1) {
                                         var n1 = chatcontent.content[i].columns[1].text.indexOf("<", index);
                                         var n2 = chatcontent.content[i].columns[1].text.indexOf(">", n1);

                                         if (n1 != -1 && n2 != -1) {
                                             if (n1 < n2) {
                                                 var dispayname = chatcontent.content[i].columns[1].text.slice(n1, n2 + 1);
                                                 var href = $('<div>').append(dispayname).find('a:first').attr('href');

                                                 if (/mailto:/.test(href)) {

                                                     chatcontent.content[i].columns[1].text = chatcontent.content[i].columns[1].text.replace(dispayname, '');
                                                 }
                                                 if (/fax:/.test(href)) {
                                                     //console.log(chatcontent.content[i].columns[1].text);
                                                     chatcontent.content[i].columns[1].text = chatcontent.content[i].columns[1].text.replace(dispayname, '');
                                                 }

                                                 if (/tel:/.test(href)) {
                                                     //console.log(chatcontent.content[i].columns[1].text);
                                                     chatcontent.content[i].columns[1].text = chatcontent.content[i].columns[1].text.replace(dispayname, '');
                                                 }
                                                 else {
                                                     chatcontent.content[i].columns[1].text = chatcontent.content[i].columns[1].text.replace(dispayname, '(' + href + ') ');
                                                 }


                                             }
                                             else {
                                                 index = n2;
                                             }
                                         }
                                         else {
                                             index = -1;
                                         }
                                     }

                                 } else { }
                             }
                         }
                         pdfMake.createPdf(chatcontent).download('chatscript.pdf');

                     }
                 }
                 else{
                    alertify.alert("No Messagedata found");
                 }
             }
             else{
                alertify.alert("Not Found");
             }
         },function(err){
            if(err && err.status == 403){
                $state.go('login');
            }
            else{
                alertify.alert("No records found!");
            }
        });
    }

    $rootScope.ThrottleCount = 5000;
    $rootScope.CurrentUsageCount = 0;
    var start = moment().tz('America/New_York').startOf('day'); 
    var end = moment().tz('America/New_York').endOf('day');
    // var start = moment.utc().startOf('day').tz('America/New_York');
    // var end = moment.utc().endOf('day').tz('America/New_York');
    $rootScope.StartTime = start.format("MM/DD/YY hh:mm:ss a");
    $rootScope.EndTime = end.format("MM/DD/YY hh:mm:ss a");
    $scope.GetThrottleCount = function(){
        var url = "GetThrottleCounter";
        chatRequest.getRequest(url, "").then(function (data) {
            if (data) {
                if (data.data && data.data.counter != undefined) {
                    $rootScope.CurrentUsageCount = data.data.counter;
                }
                else {
                    alertify.alert("No record found!");
                }
            }
            else {
                alertify.alert("No record found!");
            }
        });
    }

    $scope.GetThrottleCount();

    $('#channelId').on('change', function (event) {
        // get chats by channel
        var channelId = document.getElementById('channelId');
        var channeltext = channelId.options[channelId.selectedIndex].text;
        var channel = channelId.value;
        var channelurl = "messagedata?page=1&limit=10&channel=" + channel;
        for(var i=0; i<indexs.length; i++){
            $("#conId-" + (indexs[i])).removeClass("active");
        }
        chatRequest.getRequest(channelurl, "").then(function (data) {

            if (data) {

                total = data.data.total;
                page = data.data.page;
                pages = data.data.pages;
                if (page === pages) {
                    $scope.nbtdis = false;
                    $scope.pbtdis = false;
                }
                else {
                    $scope.nbtdis = true;
                }

                $scope.chats = [];
                $scope.chatDetails = [];
                if (data.data.docs) {
                    if (data.data.docs.length > 0) {

                        for (var i = 0; i < data.data.docs.length; i++) {
                            var chat = {};

                            if (data.data.docs[i].fname || data.data.docs[i].lname) {

                                chat.fname = data.data.docs[i].fname;
                                // chat.lname = data.data.docs[i].lname;
                                // chat.logo = chat.fname.charAt(0)+chat.lname.charAt(0);
                                chat.logo = chat.fname.charAt(0);
                                //$scope.name = chat.fname+' '+chat.lname;
                            } else {

                                chat.fname = 'NA';
                                chat.lname = "";
                                chat.logo = 'NA';
                                //$scope.name = "NA";

                            }
                            chat.errorcount = data.data.docs[i].errorcount;
                            chat.id = data.data.docs[i].conversationid;
                            if (data.data.docs[i].phone) {
                                chat.phone = data.data.docs[i].phone;
                            }
                            else {
                                chat.phone = 'NA'
                            }
                            chat.createdAt = moment(data.data.docs[i].createdAt).format('MM/DD/YY hh:mm:ss');
                            chat.color = $scope.getRandomColor();
                            $scope.chats.push(chat);
                        }
                    }
                    else {
                        alertify.alert("No records found!");
                    }
                }
                else {
                    alertify.alert("No records found!");
                }
            }
            else {
                alertify.alert("No records found!");
            }

        },function(err){
            if(err && err.status == 403){
                $state.go('login');
            }
            else{
                alertify.alert("No records found!");
            }
        });
    });
}])