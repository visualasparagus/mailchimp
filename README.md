Mailchimp
=========

A simple script to add an email address to a MailChimp list using API 3.0. 

Requires an API key and a list ID

## Installation

  npm install @visualasparaugs/mailchimp --save

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
	}git tag -d release01
	//
	function onError() {
	    console.log('there was an error');
	}

## Dependencies

* md5
* unirest

## Release History

* 0.1.0 Initial release