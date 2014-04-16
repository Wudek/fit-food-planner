angular.module('directives')
	.directive('zDietChart', function ()
	{
		var id = 0;

		function fixOptions(id)
		{
			function fixOption(optionID)
			{
				var inputID = 'option' + optionID + '_input';
				var labelID = 'option' + optionID + '_label';
				var input = $('#' + inputID);
				var label = $('#' + labelID);
				inputID += '_' + id;
				labelID += '_' + id;
				input.attr('id', inputID );
				label.attr('id', labelID );
				label.prop('for', inputID);
			}
			fixOption(0);
			fixOption(2);
		}

		function link($scope, element, attributes)
		{
			fixOptions(id++);
			var options ={
				macros : 0,
				macroPercentages : 1,
				calories : 2
			};

			$scope.option = options.macros;
			var diet;

			//Chart
			var chart = new AmCharts.AmSerialChart();
			chart.categoryField = 'name';
			chart.rotate = true;
			chart.startDuration = 1;
			chart.precision = 0;
			chart.creditsPosition = 'bottom-right';
			//Legend
			var legend = new AmCharts.AmLegend();
			legend.position = 'right';
			legend.maxColumns = 1;
			chart.addLegend(legend);
			//Cursor
			var chartCursor = new AmCharts.ChartCursor();
			chartCursor.cursorAlpha = 0;
			chartCursor.zoomable = false;
			chartCursor.categoryBalloonEnabled = false;
			chartCursor.valueBalloonsEnabled = false;
			chart.addChartCursor(chartCursor);
			//value axis
			var valueAxis = new AmCharts.ValueAxis();
			valueAxis.axisAlpha = 0;
			valueAxis.gridAlpha = 0;
			valueAxis.labelsEnabled = false;
			valueAxis.stackType = 'regular';
			chart.addValueAxis(valueAxis);
			//category axis
			var categoryAxis = chart.categoryAxis;
			categoryAxis.axisThickness = 2;
			categoryAxis.gridAlpha = 0;
			//Write to element
			chart.write(element[0].children[1]);

			function setMeals(meals)
			{
				chart.dataProvider = meals;
				chart.validateData();
			}

			function clearGraphs()
			{
				chart.titles = [];
				chart.graphs = [];
			}

			function setMacrosChart()
			{
				function addMacroGraph(valueField, legendText, balloonText)
				{
					var graph = new AmCharts.AmGraph();
					graph.valueField = valueField;
					graph.balloonText = balloonText;
					graph.type = 'column';
					graph.lineAlpha = 0;
					graph.fillAlphas = 0.8;
					graph.labelText = '[[value]]g';
					graph.legendValueText = legendText;
					chart.addGraph(graph);
				}
				addMacroGraph('protein', 'Protein', '[[category]] protein: <b>[[value]]g</b>');
				addMacroGraph('carbs', 'Carbs', '[[category]] carbs: <b>[[value]]g</b>');
				addMacroGraph('fats', 'Fats', '[[category]] fats: <b>[[value]]g</b>');
				chart.addTitle('Macro distribution per meal');
			}

			function setMacroPercentagesChart()
			{
//				chart.addTitle('Macro % per meal');
			}

			function setCaloriesChart()
			{
				var graph = new AmCharts.AmGraph();
				graph.valueField = 'calories';
				graph.balloonText =  '[[category]] calories: <b>[[value]]</b>';
				graph.type = 'column';
				graph.lineAlpha = 0;
				graph.fillAlphas = 0.8;
				graph.labelText = '[[value]]';
				graph.legendValueText = 'Calories';
				chart.addGraph(graph);
				chart.addTitle('Calories per meal');
			}

			$scope.$watch('diet', function (diet)
			{
				setMeals(diet.meals);
			}, true);

			$scope.$watch('option', function (value)
			{
				clearGraphs();
				switch($scope.option)
				{
					case options.macros:
						setMacrosChart();
						break;
					case options.macroPercentages:
						setMacroPercentagesChart();
						break;
					case options.calories:
						setCaloriesChart();
						break;
				}
				chart.validateNow();
			});
		}

		return {
			restrict    : 'AE',
			scope       : {
				diet : '='},
			link        : link,
			templateUrl : 'directives/zDietChart'
		};
	});