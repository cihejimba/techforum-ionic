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
        },
        /** get online comment resource **/
        getOnlineMsgComment : function (){
            msgFactory.commentResource = $resource('http://techforum-worldline.rhcloud.com//messages/comments/');
            return msgFactory.commentResource;
        }
    };
    return msgFactory;
}]);
