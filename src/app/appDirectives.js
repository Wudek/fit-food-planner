angular.module('ffp').directive('zClient', function ()
{
	return {
		restrict    : 'AE',
		scope       : {client : '=client'},
		templateUrl : 'directives/zClient'
	};
}).directive('zChart', function ()
{
	function link($scope, element, attributes)
	{
		var data;

		function fixChart()
		{
			AmCharts.theme = AmCharts.themes.light;
			// SERIAL CHART
			var chart = new AmCharts.AmSerialChart();
			chart.dataProvider = data;
			chart.categoryField = "country";
//			chart.startDuration = 1;
			// AXES
			// category
			var categoryAxis = chart.categoryAxis;
			categoryAxis.labelRotation = 90;
			categoryAxis.gridPosition = "start";
			// value
			// in case you don't want to change default settings of value axis,
			// you don't need to create it, as one value axis is created automatically.
			// GRAPH
			var graph = new AmCharts.AmGraph();
			graph.valueField = "visits";
			graph.balloonText = "[[category]]: <b>[[value]]</b>";
			graph.type = "column";
			graph.lineAlpha = 0;
			graph.fillAlphas = 0.8;
			chart.addGraph(graph);
			// CURSOR
			var chartCursor = new AmCharts.ChartCursor();
			chartCursor.cursorAlpha = 0;
			chartCursor.zoomable = false;
			chartCursor.categoryBalloonEnabled = false;
			chart.addChartCursor(chartCursor);
			chart.creditsPosition = "top-right";
			chart.write(element[0].children[0]);
		}

		$scope.$watch('data', function (value)
		{
			data = value;
			fixChart();
		});
	}

	return {
		restrict    : 'AE',
		scope       : {
			data : '='},
		link        : link,
		templateUrl : 'directives/zChart'
	};
});