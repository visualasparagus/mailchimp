var unirest = require('unirest');
var md5 = require('md5');
//
//
//
module.exports = function(mailChimpApiKey) {
    //
    //
    var apiListEndPoint = 'https://'+mailChimpApiKey.split('-')[1]+'.api.mailchimp.com/3.0/lists/';
    //
    //
    function addMemberToList(mailChimpListId, emailAddress, onSuccessCallback, onErrorCallback) {
        var requestBody = {
                email_address: emailAddress,
                status: "pending"
            },
            endPoint = apiListEndPoint+mailChimpListId+'/members/';
        //
        unirest.post(endPoint)
            .auth({
                user: '',
                pass: mailChimpApiKey,
                sendImmediately: true
            })
            .header('Accept', 'application/json')
            .type('json')
            .send(requestBody)
            .end(function(response) {
                if (response.statusType === 2) {
                    onSuccessCallback();
                } else {
                    onErrorCallback();
                }
            });
    }
    //
    //
    function getMemberStatus(mailChimpListId, emailAddress, onSuccessCallback, onErrorCallback) {
        var endPoint = apiListEndPoint+mailChimpListId+'/members/'+md5(emailAddress)+'?fields=status';
        //
        unirest.get(endPoint)
            .auth({
                user: '',
                pass: mailChimpApiKey,
                sendImmediately: true
            })
            .header('Accept', 'application/json')
            .type('json')
            .send()
            .end(function(response) {
                var status = response.body.status;
                switch (status) {
                    case 'subscribed':
                    case 'unsubscribed':
                    case 'cleaned':
                    case 'pending':
                        onSuccessCallback(status);
                        break;
                    case 404:
                        onSuccessCallback('non-member');
                        break;
                    default:
                        onErrorCallback();
                        break;
                }
            });
    };
    //
    //
    //
    //
    return function(mailChimpListId, emailAddress, onSuccessCallback, onErrorCallback) {
        getMemberStatus(mailChimpListId, emailAddress,
            // onSuccessCallback
            function(status) {
                if(status === 'non-member') {
                    addMemberToList(mailChimpListId, emailAddress,
                        function() {
                            onSuccessCallback('email-added');
                        },
                        function() {
                            onErrorCallback();
                        })
                } else {
                    onSuccessCallback(status);
                }
            },
            // onErrorCallback
            function() {
                onErrorCallback();
            }
        )
    };
    //
};


