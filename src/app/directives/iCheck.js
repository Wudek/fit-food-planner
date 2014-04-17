angular.module('directives').directive('iCheck', function($timeout, $parse) {
	return {
		require: 'ngModel',
		link: function($scope, element, $attrs, ngModel) {
			return $timeout(function() {
				var value = $attrs.value;

				$scope.$watch($attrs.ngModel, function(newValue){
					$(element).iCheck('update');
				});

				var color = $attrs.iCheck.toLowerCase();
				if(color === 'i-check' || color === 'icheck')
				{
					color = 'blue';
				}
				var baseStyle = 'minimal-';
				var checkboxStyle = 'icheckbox_' + baseStyle + color;
				var radioStyle = 'iradio_'+ baseStyle + color;

				return $(element).iCheck({
					checkboxClass: checkboxStyle,
					radioClass: radioStyle

				}).on('ifChanged', function(event) {
					if ($(element).attr('type') === 'checkbox' && $attrs.ngModel) {
						$scope.$apply(function() {
							return ngModel.$setViewValue(event.target.checked);
						});
					}
					if ($(element).attr('type') === 'radio' && $attrs.ngModel) {
						return $scope.$apply(function() {
							return ngModel.$setViewValue(value);
						});
					}
				});
			});
		}
	};
});