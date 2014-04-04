app.factory('MessagesService', ['$resource', function($resource) {

    var msgFactory = {

        commentResource : [],

        getOnlineMsgCommentByIdConference : function (idConference){
            return $resource('http://techforum-worldline.rhcloud.com//messages/comments/:id',{id:'@id'});
        },
        getOnlineMsgComment : function (){
            msgFactory.commentResource = $resource('http://techforum-worldline.rhcloud.com//messages/comments/');
            return msgFactory.commentResource;
        }
    };
    return msgFactory;
}]);
