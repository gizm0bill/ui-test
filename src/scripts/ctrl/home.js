define([ 'angular', 'srv/data', 'dir/table', 'dir/indeterminate' ], 
function homeControllerModule( angular, dataSrvMod, table, indet ) 
{
	'use strict';

	return [dataSrvMod, indet, table, angular.module('core.components')
	.filter('prettyColHeader', () =>
	{
		return (val) => val.replace('_', ' ')
	})
	.filter('selectedLen', () =>
	{
		return (val) => { var l=0; for( let i in val ) l += val[i]; return l }
	})
	.controller('HomeCtrl', [ '$scope', '$timeout', 'api',
		function($scope, $timeout, api)
	{
		$scope.data = []; // table data
		$scope.maxRows = 20; // max display rows
		$scope.cols = []; // table cols
		
		$scope.selected = {ids: {}}
		$scope.$watchCollection('filteredRows', (n)=>
		{ 
			$scope.selected.ids = {}
			for( let i in n ) $scope.selected.ids[n[i].id] = false;
		});
		
		$scope.setMaxRows = val=>$scope.maxRows = val; 
		// set col header values on data change
		$scope.$watchCollection('data', (newData)=> newData.length && ($scope.cols = Object.keys(newData[0])) );
		// get data from api
		api.getAll().then( res => 
		{
			$scope.data = res.data
		});
		

	}])]
});