Mailchimp
=========

A simple script to add an email address to a MailChimp list using API 3.0. 

This only takes an email address and does not manage any merge fields, etc. It will first check the status of the email address.

Requires an MailChimp API key and a list ID

## Installation

  npm install @visualasparagus/mailchimp --save

## Usage

	var mailchimp = require('@visualasparagus/mailchimp')(
	    MAILCHIMP_API_KEY
	);
	//
	mailchimpSignup(MAILCHIMP_LIST_ID, 'me@email.com',
	    onSuccess,
	    onError);
	//
	function onSuccess(status) {
	    console.log(status);
	    /*
	    Values for status can be the following.
	    See mailchimp for more information 
	    http://developer.mailchimp.com/documentation/mailchimp/reference/lists/members/
	    
	    subscribed -> email address is already a member
        unsubscribed -> email address was a member but is now unsubscribed
        cleaned -> email address was a memember but is now cleaned
        pending -> email address is already signed up but is pending opt-in confirmation
		email-added -> email address was successfully added and is now pending opt-in confirmaiton
	    */
	}
	//
	function onError() {
	    console.log('there was an error');
	}

## Dependencies

* md5
* unirest
