app.factory('MessagesService', ['$resource', function($resource) {

    var msgFactory = {

        commentResource : [],

        getOnlineMsgCommentByIdConference : function (idConference){
            var r =  $resource('http://techforum-worldline.rhcloud.com//messages/comments/:id',{idConference:'@id'});
            console.log(r);
            return r;
        },
        getOnlineMsgComment : function (){
            msgFactory.commentResource = $resource('http://techforum-worldline.rhcloud.com//messages/comments/');
            return msgFactory.commentResource;
        }
    };
    return msgFactory;
}]);
