
/**
 * ngSails Socket.io Provider
 *
 * Wraps socket.io to plug it into Angular's digest cycle
 *
 * Code from :
 *
 * - angular-socket-io by Brian Ford : https://github.com/btford/angular-socket-io
 * 
 * (c) 2014 Brian Ford http://briantford.com
 * License: MIT
 *
 * 
 * 
 * - sails.io.js by Balderdashy : https://github.com/balderdashy/sails
 *
 * 
 * 
 * 
 */

 angular.module('ngSails.io', []).

 provider('sailsSocketFactory', function () {

    // when forwarding events, prefix the event name
    var defaultPrefix = 'sails:',
    ioSocket;

    // expose to provider
    this.$get = ['$q','$rootScope','$timeout',function ($q, $rootScope, $timeout) {

    	var asyncAngularify = function (socket, callback) {
    		return callback ? function () {
    			var args = arguments;
    			$timeout(function () {
    				callback.apply(socket, args);
    			}, 0);
    		} : angular.noop;
    	};

    	var sailsRequest = function (socket, method, url, data) {
    		var sailsDeferredRequest = $q.defer()

    		url = url.replace(/^(.+)\/*\s*$/, '$1');
    		// If method is undefined, use 'get' 
    		method = method || 'get';

    		if ( typeof url !== 'string' ) {
    			sailsDeferredRequest.reject(new Error('Invalid or missing URL!\n' + usage));
    		}

    		var requestJson = io.JSON.stringify({
    			url: url,
    			data: data
    		});

    		// Send the message over the socket
    		socket.emit(method, requestJson, asyncAngularify(socket,function afterEmitted (result) {
    			var parsedResult = result;
    			if (result && typeof result === 'string') {
    				try {
    					parsedResult = io.JSON.parse(result);
    				} catch (e) {
    					if (typeof console !== 'undefined') {
    						console.warn("Could not parse:", result, e);
    					}
    					return sailsDeferredRequest.reject("Server response could not be parsed!\n" + result);
    				}
    			}
    			if (parsedResult === 404) return sailsDeferredRequest.reject(new Error("404: Not found"));
    			if (parsedResult === 403) return sailsDeferredRequest.reject(new Error("403: Forbidden"));
    			if (parsedResult === 500) return sailsDeferredRequest.reject(new Error("403: Forbidden"));
    			return sailsDeferredRequest.resolve(parsedResult)
    		}));
    		return sailsDeferredRequest.promise;
    	}

    return function socketFactory (options) {
    	options = options || {};
    	var socket = options.ioSocket || io.connect(options.baseUrl || 'http://localhost:1337');
    	var prefix = options.prefix || defaultPrefix;
    	var defaultScope = options.scope || $rootScope;

      var eventLog = []

      function writeToLocalLog(){}


    	var addListener = function (eventName, callback) {
    		socket.on(eventName, asyncAngularify(socket, callback));
    	};

    	var wrappedSocket = {
    		on: addListener,
    		addListener: addListener,

    		emit: function (eventName, data, callback) {
    			return socket.emit(eventName, data, asyncAngularify(socket, callback));
    		},

    		removeListener: function () {
    			return socket.removeListener.apply(socket, arguments);
    		},

          // when socket.on('someEvent', fn (data) { ... }),
          // call scope.$broadcast('someEvent', data)
          forward: function (events, scope) {
          	if (events instanceof Array === false) {
          		events = [events];
          	}
          	if (!scope) {
          		scope = defaultScope;
          	}
          	events.forEach(function (eventName) {
          		var prefixedEvent = prefix + eventName;
          		var forwardBroadcast = asyncAngularify(socket, function (data) {
          			scope.$broadcast(prefixedEvent, data);
          		});
          		scope.$on('$destroy', function () {
          			socket.removeListener(eventName, forwardBroadcast);
          		});
          		socket.on(eventName, forwardBroadcast);
          	});
          },

          //sails REST API over socket.io with promises ftw

          get : function(path,query){

          	return sailsRequest(socket,'get',path,query)

          },
          post : function(path,data){

          	return sailsRequest(socket,'post',path,data)

          },
          put : function(path,data){

          	return sailsRequest(socket,'put',path,data)

          },
          delete : function(path,data){

          	return sailsRequest(socket,'delete',path,data)

          },
          // patch : function(path,query){}



      };

      return wrappedSocket;
  };
}];
});