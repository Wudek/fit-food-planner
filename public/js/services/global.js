/*global angular:false */
'use strict';
angular.module('myApp.services').factory("Global", [
	function ()
	{
		var _this = this;
		_this._data = {
			user          : window.user,
			authenticated : !!window.user
		};
		return _this._data;
	}
]);