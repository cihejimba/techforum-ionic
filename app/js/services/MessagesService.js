app.factory('MessagesService', ['$resource', function($resource) {

    var msgFactory = {

        commentResource : [],

        getOnlineMsgCommentByIdConference : function (idConference){
            var lien = 'http://techforum-worldline.rhcloud.com//messages/comments/'+idConference;
            return $resource(lien);
        },
        getOnlineMsgComment : function (){
            msgFactory.commentResource = $resource('http://techforum-worldline.rhcloud.com//messages/comments/');
            return msgFactory.commentResource;
        }
    };
    return msgFactory;
}]);
