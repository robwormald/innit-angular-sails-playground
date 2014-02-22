/**
 * Instance.js
 *
 *	An abstract top level data object. useful for breaking into SaaS type things. An instance maps to an issuer in a JWT. 
 * 
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {



	attributes: {

		instance_name : {type : 'string'},
		rooms : {collection : 'room', via : 'instance'}


	}

};
