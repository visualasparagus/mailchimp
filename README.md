Mailchimp
=========

A simple script to add an email address to a MailChimp list. 

Requires an API key and a list ID

## Installation

  npm install mailchimp --save

## Usage

	var mailchimp = require('mailchimp')(
	    MAILCHIMP_API_KEY
	);
	//
	mailchimpSignup(MAILCHIMP_LIST_ID, 'me@email.com',
	    onSuccess,
	    onError);
	//
	function onSuccess(status) {
	    console.log(status);
	}
	//
	function onError() {
	    console.log('there was an error');
	}

## Dependencies

* md5
* unirest

## Release History

* 0.1.0 Initial release