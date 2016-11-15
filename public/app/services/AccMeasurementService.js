appServices.factory('AccMeasurementService', function($http) {

	return {
		
		listAll: function() {
			return $http.get(options.api.base_url + '/accmeasurement/listAll');
		}
	};

)};