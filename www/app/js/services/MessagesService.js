/**
 * Message Service
 */
app.factory('MessagesService', ['$resource', function($resource) {

    var msgFactory = {

        commentResource : [],
        /** get online comment resource by conference **/
        getOnlineMsgCommentByIdConference : function (idConference){
            var lien = 'http://techforum-worldline.rhcloud.com//messages/comments/'+idConference;
            return $resource(lien);
        }
    };
    return msgFactory;
}]);
