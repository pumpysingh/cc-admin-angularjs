adminApp.service('chatData', function(){

    var url = "messagedata?page=" + page + "&limit=4&sort=phone&sortorder=desc";
            chatRequest.getRequest(url,"").then(function (data) {
                                
                console.log(data);
                if(data) {
                    
                    total = data.data.total;
                    page = data.data.page;
                    pages = data.data.pages;
        
                    if(data.data.docs){
                        if(data.data.docs.length > 0){
                            $scope.chats = [];
                            for(var i=0; i<data.data.docs.length; i++){
                                var chat={};
                                chat.id = data.data.docs[i].conversationid;
                                chat.phone = data.data.docs[i].phone;
                                chat.createdAt = data.data.docs[i].createdAt;
        
                                $scope.chats.push(chat);
                            }
                        }    
                    }    
                }
                else{
                    
                }
               
            },function(err){
                if(err && err.status == 403){
                    $state.go('login');
                }
                else{
                    alertify.alert("No records found!");
                }
            })

}).directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
})