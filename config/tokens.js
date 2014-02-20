/**
 * 	sails-jwt-auth configuration and devdocs
 *
 * 
 */




/**
 * JSON Web Token (JWT) Overview
 * -------------------------------
 * 
 * JWTs represent a set of claims as a JSON object that is encoded in a JWS and/or JWE structure. 
 * 
 * 
 * This JSON object is the JWT Claims Set. 
 * The JSON object consists of zero or more name/value pairs (or members), where the names are strings and the values are arbitrary JSON values. 
 * These members are the claims represented by the JWT.
 * 
 * The member names within the JWT Claims Set are referred to as Claim Names. The corresponding values are referred to as Claim Values.
 * 
 * The contents of the JWT Header describe the cryptographic operations applied to the JWT Claims Set. 
 * 
 * If the JWT Header is a JWS Header, the JWT is represented as a JWS, and the claims are digitally signed or MACed, with the JWT Claims Set being the JWS Payload. 
 * If the JWT Header is a JWE Header, the JWT is represented as a JWE, and the claims are encrypted, with the JWT Claims Set being the input Plaintext. 
 * 
 * A JWT may be enclosed in another JWE or JWS structure to create a Nested JWT, enabling nested signing and encryption to be performed.
 * A JWT is represented as a sequence of URL-safe parts separated by period ('.') characters. Each part contains a base64url encoded value. 
 * The number of parts in the JWT is dependent upon the representation of the resulting JWS or JWE object using the JWS Compact Serialization or the JWE Compact Serialization.
 * 
 * The suggested pronunciation of JWT is the same as the English word "jot", as in "u wot m8".
 */


/**
 * Example JWT
 * -----------
 * 
 * The following example JWT Header declares that the encoded object is a JSON Web Token (JWT) and the JWT is a JWS that is MACed using the HMAC SHA-256 algorithm:
 * 
 * {"typ":"JWT",
 * "alg":"HS256"}
 * 
 * The following octet sequence is the UTF-8 representation of the JWT Header/JWS Header above:
 * [123, 34, 116, 121, 112, 34, 58, 34, 74, 87, 84, 34, 44, 13, 10, 32, 34, 97, 108, 103, 34, 58, 34, 72, 83, 50, 53, 54, 34, 125]
 * 
 * Base64url encoding the octets of the UTF-8 representation of the JWT Header yields this Encoded JWT Header value (which is also the underlying encoded JWS Header value):
 * eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9
 * 
 * The following is an example of a JWT Claims Set:
 * 
 * {"iss":"joe",
 * "exp":1300819380,
 * "http://example.com/is_root":true}
 * 
 * 
 * */


/**
 * JWT Settings
 */

 module.exports = {



	/**
	 * JWT Header
	 * The members of the JSON object represented by the JWT Header describe the cryptographic operations applied to the JWT and optionally, additional properties of the JWT. 
	 * The member names within the JWT Header are referred to as Header Parameter Names. 
	 * These names MUST be unique; recipients MUST either reject JWTs with duplicate Header Parameter Names or use a JSON parser that returns only the lexically last duplicate member name,
	 * The corresponding values are referred to as Header Parameter Values.
	 * JWS Header Parameters are defined by [JWS]. JWE Header Parameters are defined by [JWE]. 
	 * This specification further specifies the use of the following Header Parameter in both the cases where the JWT is a JWS and where it is a JWE.
	 * */

	 header : {

	 	/**
	 	 * "typ" (Type) Header Parameter
	 	 * The typ (type) Header Parameter defined by [JWS] and [JWE] is used to declare the MIME Media Type [IANA.MediaTypes] of this complete JWT in contexts where this is useful to the application. 
	 	 * This parameter has no effect upon the JWT processing. If present, it is RECOMMENDED that its value be JWT to indicate that this object is a JWT. 
	 	 * While media type names are not case-sensitive, it is RECOMMENDED that JWT always be spelled using uppercase characters for compatibility with legacy implementations. 
	 	 * 
	 	 * Use of this Header Parameter is OPTIONAL.


	 	 * @type {String}
	 	 */
	 	typ : 'JWT',
	 	/**
	 	 *  "cty" (Content Type) Header Parameter
	 	 *  
	 	 *  The cty (content type) Header Parameter defined by [JWS] and [JWE] is used by this specification to convey structural information about the JWT.
	 	 *  
	 	 *  In the normal case where nested signing or encryption operations are not employed, the use of this Header Parameter is NOT RECOMMENDED. 
	 	 *  
	 	 *  In the case that nested signing or encryption is employed, this Header Parameter MUST be present; in this case, the value MUST be JWT, to indicate that a Nested JWT is carried in this JWT. 
	 	 *  
	 	 *  While media type names are not case-sensitive, it is RECOMMENDED that JWT always be spelled using uppercase characters for compatibility with legacy implementations. See Appendix A.2 for an example of a Nested JWT.
	 	 * @type {String}
	 	 */
	 	cty : 'JWT',


	 	/**
	 	 *   Replicating Claims as Header Parameters
	 	 *   
	 	 *   In some applications using encrypted JWTs, it is useful to have an unencrypted representation of some Claims. 
	 	 *   
	 	 *   This might be used, for instance, in application processing rules to determine whether and how to process the JWT before it is decrypted.
	 	 *   
	 	 *   This specification allows Claims present in the JWT Claims Set to be replicated as Header Parameters in a JWT that is a JWE, as needed by the application. 
	 	 *   If such replicated Claims are present, the application receiving them SHOULD verify that their values are identical. 
	 	 *   
	 	 *   *** It is the responsibility of the application to ensure that only claims that are safe to be transmitted in an unencrypted manner are replicated as Header Parameter Values in the JWT. ***
	 	 *   
	 	 *   This specification registers the iss (issuer), sub (subject), and aud (audience) Header Parameter Names for the purpose of providing unencrypted replicas of these Claims in encrypted JWTs for applications that need them. 
	 	 *   
	 	 *   Other specifications MAY similarly register other names that are registered Claim Names as Header Parameter Names, as needed.
	 	 */
	 	replicate : ['iss','sub','aud']
	 },

	/**
	 * JWT Claims
	 * 
	 * The JWT Claims Set represents a JSON object whose members are the claims conveyed by the JWT. 
	 * 
	 * The Claim Names within a JWT Claims Set MUST be unique; recipients MUST either reject JWTs with duplicate Claim Names or use a JSON parser that returns only the lexically last duplicate member name.
	 * 
	 * The set of claims that a JWT must contain to be considered valid is context-dependent and is outside the scope of this specification. 
	 * Specific applications of JWTs will require implementations to understand and process some claims in particular ways. 
	 * 
	 * However, in the absence of such requirements, all claims that are not understood by implementations SHOULD be ignored.
	 * 
	 * There are three classes of JWT Claim Names: Registered Claim Names, Public Claim Names, and Private Claim Names.
	 */
	claims : {


		/**
		 * The following Claim Names are registered in the IANA JSON Web Token Claims registry defined in Section 10.1. 
		 * None of the claims defined below are intended to be mandatory to use, but rather, provide a starting point for a set of useful, interoperable claims. 
		 * All the names are short because a core goal of JWTs is for the representation to be compact.
		 * 
		 * @type {Object}
		 */
		registered : {

			/**
			 * The iss (issuer) claim identifies the principal that issued the JWT.
			 *
			 * In sails-token-auth, this means you. However, this could also be a trusted third party JWT issuer.
			 * 
			 * The processing of this claim is generally application specific. 
			 * The iss value is a case-sensitive string containing a StringOrURI value. 
			 * 
			 * Use of this claim is OPTIONAL
			 * @type {String}
			 */
			iss : 'startup.io',

			/**
			 * "sub" (Subject) Claim
			 * 
			 * The sub (subject) claim identifies the principal that is the subject of the JWT. 
			 * The Claims in a JWT are normally statements about the subject. The subject value MAY be scoped to be locally unique in the context of the issuer or MAY be globally unique. 
			 * The processing of this claim is generally application specific. The sub value is a case-sensitive string containing a StringOrURI value. Use of this claim is OPTIONAL.
			 *
			 * By default this is the User.id
			 *
			 * 
			 **/
			 
			sub : true,

			 /**
			  * "aud" (Audience) Claim
			  * The aud (audience) claim identifies the audiences that the JWT is intended for. 
			  * Each principal intended to process the JWT MUST identify itself with a value in audience claim. 
			  * If the principal processing the claim does not identify itself with a value in the aud claim, then the JWT MUST be rejected. 
			  * 
			  * In the general case, the aud value is an array of case-sensitive strings, each containing a StringOrURI value. 
			  * In the special case when the JWT has one audience, the aud value MAY be a single case-sensitive string containing a StringOrURI value. 
			  * 
			  * The interpretation of audience values is generally application specific. Use of this claim is OPTIONAL.
			  *  
			  */
			aud : 'ngSailsPlayground:public',

			 /**
			  * "exp" (Expiration Time) Claim
			  * 
			  * The exp (expiration time) claim identifies the expiration time on or after which the JWT MUST NOT be accepted for processing. 
			  * The processing of the exp claim requires that the current date/time MUST be before the expiration date/time listed in the exp claim. 
			  * Implementers MAY provide for some small leeway, usually no more than a few minutes, to account for clock skew. 
			  * 
			  * Its value MUST be a number containing an IntDate value. Use of this claim is OPTIONAL.
			  * 
			  * 
			  * 
			  * */
			  
			
			exp : 24 * 60 * 60, /* 24 hours */

			  /**
			   * "nbf" (Not Before) Claim
			   *
			   * The nbf (not before) claim identifies the time before which the JWT MUST NOT be accepted for processing. 
			   * The processing of the nbf claim requires that the current date/time MUST be after or equal to the not-before date/time listed in the nbf claim. 
			   * 
			   * Implementers MAY provide for some small leeway, usually no more than a few minutes, to account for clock skew. 
			   * 
			   * Its value MUST be a number containing an IntDate value. Use of this claim is OPTIONAL.
			   * 
			   * */

			nbf : false,

			/**
			 * TOC 4.1.6.  "iat" (Issued At) Claim
			 *
			 * The iat (issued at) claim identifies the time at which the JWT was issued. 
			 * 
			 * This claim can be used to determine the age of the JWT. Its value MUST be a number containing an IntDate value. Use of this claim is OPTIONAL.

			 */
			iat : true,

			/**
			  * "jti" (JWT ID) Claim 
			  * 
			  * The jti (JWT ID) claim provides a unique identifier for the JWT. 
			  * 
			  * The identifier value MUST be assigned in a manner that ensures that there is a negligible probability that the same value will be accidentally assigned to a different data object. 
			  * 
			  * The jti claim can be used to prevent the JWT from being replayed. The jti value is a case-sensitive string. Use of this claim is OPTIONAL.
			  * 
			  * 
			  * */
			jti : true
		},


		/**
		 *  Public Claim Names
		 *  
		 *  Claim Names can be defined at will by those using JWTs. However, in order to prevent collisions, any new Claim Name should either be registered in the IANA JSON Web Token Claims registry defined in Section 10.1 
		 *  or be a Public Name: a value that contains a Collision-Resistant Name. 
		 *  
		 *  In each case, the definer of the name or value needs to take reasonable precautions to make sure they are in control of the part of the namespace they use to define the Claim Name.
		 * @type {Object}
		 */
		public : {},

		/**
		 * A producer and consumer of a JWT MAY agree to use Claim Names that are Private Names: names that are not Registered Claim Names Section 4.1 or Public Claim Names Section 4.2. 
		 * Unlike Public Claim Names, Private Claim Names are subject to collision and should be used with caution.
		 * * @type {Object}
		 */
		private : {}
	}
}



 /**
  * Terminology
  * 
  * JSON Web Token (JWT)
  * ----------
  * A string representing a set of claims as a JSON object that is encoded in a JWS or JWE, enabling the claims to be digitally signed or MACed and/or encrypted.
  *
  * Base64url Encoding
  * Base64 encoding using the URL- and filename-safe character set defined in Section 5 of RFC 4648 [RFC4648], with all trailing '=' characters omitted 
  * 
  * JWT Header
  * ----------
  * A JSON object that describes the cryptographic operations applied to the JWT. When the JWT is digitally signed or MACed, the JWT Header is a JWS Header. 
  * When the JWT is encrypted, the JWT Header is a JWE Header.
  * 
  * Header Parameter
  * ----------
  * A name/value pair that is member of the JWT Header.
  * 
  * Header Parameter Name
  * ----------
  * The name of a member of the JWT Header.
  *
  * Header Parameter Value
  * ----------
  * The value of a member of the JWT Header.
  * 
  * JWT Claims Set
  * ----------
  * A JSON object that contains the Claims conveyed by the JWT.
  *
  * Claim
  * ----------
  * A piece of information asserted about a subject. A Claim is represented as a name/value pair consisting of a Claim Name and a Claim Value.
  * 
  * Claim Name
  * ----------
  * The name portion of a Claim representation. A Claim Name is always a string.
  * 
  * Claim Value
  * ----------
  * The value portion of a Claim representation. A Claim Value can be any JSON value.
  * 
  * Encoded JWT Header
  * ----------
  * Base64url encoding of the JWT Header.
  * 
  * Nested JWT
  * ----------
  * A JWT in which nested signing and/or encryption are employed. 
  * In nested JWTs, a JWT is used as the payload or plaintext value of an enclosing JWS or JWE structure, respectively.
  * 
  * Plaintext JWT
  * ----------
  * A JWT whose Claims are not integrity protected or encrypted.
  * 
  * Collision-Resistant Name
  * ----------
  * A name in a namespace that enables names to be allocated in a manner such that they are highly unlikely to collide with other names. 
  * Examples of collision-resistant namespaces include: Domain Names, Object Identifiers (OIDs) and Universally Unique IDentifiers (UUIDs) [RFC4122]. 
  * When using an administratively delegated namespace, the definer of a name needs to take reasonable precautions to ensure they are in control of the portion of the namespace they use to define the name
  * 
  * StringOrURI
  * ----------
  * JSON string value, with the additional requirement that while arbitrary string values MAY be used, any value containing a ":" character MUST be a URI [RFC3986]. StringOrURI values are compared as case-sensitive strings with no transformations or canonicalizations applied.
  * 
  * IntDate
  * ----------
  * A JSON numeric value representing the number of seconds from 1970-01-01T0:0:0Z UTC until the specified UTC date/time. 
  * See RFC 3339 [RFC3339] for details regarding date/times in general and UTC in particular.
  * 
  * */