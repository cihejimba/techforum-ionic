app.factory('MessagesService', ['$resource', function($resource) {

    var msgFactory = {

        commentResource : [],

        getOnlineMsgCommentByIdConference : function (idConference){
            var lien = 'http://techforum-worldline.rhcloud.com//messages/comments/'+idConference;
            return $resource(lien);
        },
        getOnlineMsgComment : function (){
            msgFactory.commentResource = $resource('http://techforum-worldline.rhcloud.com//messages/comments/',{id:'@id'});
            return msgFactory.commentResource;
        }
    };
    return msgFactory;
}]);
