angular.module('directives')
	.directive('zDietChart', function ()
	{
		function link($scope, element, attributes)
		{
			var options ={
				macros : 0,
				macroPercentages : 1,
				calories : 2
			};

			$scope.option = options.macros;
			var diet;

			var proteinColor = 'rgb(255, 102, 0)';
			var carbsColor = 'rgb(252, 210, 2)';
			var fatsColor = 'rgb(176, 222, 9)';
			var caloriesColor = proteinColor;
			//Chart
			var chart = new AmCharts.AmSerialChart();
			chart.categoryField = 'name';
			chart.rotate = true;
			chart.startDuration = 1;
			chart.precision = 0;
			chart.creditsPosition = 'bottom-right';
			//Legend
			var legend = new AmCharts.AmLegend();
			legend.switchable = false;
//			legend.textClickEnabled = true;
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
			chart.addValueAxis(valueAxis);
			//category axis
			var categoryAxis = chart.categoryAxis;
			categoryAxis.axisThickness = 2;
			categoryAxis.gridAlpha = 0;
			//Write to element
			chart.write(_.last(element[0].children));

			function setMeals(meals)
			{
				chart.dataProvider = meals;
				chart.validateData();
			}

			function clearGraphs()
			{
				chart.titles = [];
				chart.graphs = [];
				legend.data = [];
			}

			function setMacrosChart()
			{
				function addMacroGraph(valueField, legendText, balloonText, color)
				{
					var graph = new AmCharts.AmGraph();
					graph.valueField = valueField;
					graph.balloonText = balloonText;
					graph.type = 'column';
					graph.lineAlpha = 0;
					graph.fillAlphas = 0.8;
					graph.fillColors = color;
					graph.labelText = '[[value]]g';
					chart.addGraph(graph);
					legend.data.push({
						title: legendText,
						color: color
					});
				}
				addMacroGraph('protein', 'Protein', '[[category]] protein: <b>[[value]]g</b>', proteinColor);
				addMacroGraph('carbs', 'Carbs', '[[category]] carbs: <b>[[value]]g</b>', carbsColor);
				addMacroGraph('fats', 'Fats', '[[category]] fats: <b>[[value]]g</b>', fatsColor);
				valueAxis.stackType = 'regular';
				chart.addTitle('Macro per meal');
				valueAxis.stackType = 'regular';
				legend.valueWidth = 50;
			}

			function setMacroPercentagesChart()
			{
				function addMacroPercentageGraph(valueField, legendText, balloonText, color)
				{
					var graph = new AmCharts.AmGraph();
					graph.valueField = valueField;
					graph.balloonText = balloonText;
					graph.type = 'column';
					graph.lineAlpha = 0;
					graph.fillAlphas = 0.8;
					graph.fillColors = color;
					graph.labelText = '[[percents]]%';
					chart.addGraph(graph);
					legend.data.push({
						title: legendText,
						color: color
					});
				}
				addMacroPercentageGraph('proteinCalories', 'Protein Calories %', '[[category]] calories from protein: <b>[[value]]%</b>', proteinColor);
				addMacroPercentageGraph('carbsColories', 'Carb Calories %', '[[category]] calories from carbs: <b>[[value]]%</b>', carbsColor);
				addMacroPercentageGraph('fatsColories', 'Fat Calories %', '[[category]] calories from fats: <b>[[value]]%</b>', fatsColor);
				chart.addTitle('Macro % per meal');
				valueAxis.stackType = '100%';
				legend.valueWidth = 110;
			}

			function setCaloriesChart()
			{
				var graph = new AmCharts.AmGraph();
				graph.valueField = 'calories';
				graph.balloonText =  '[[category]] calories: <b>[[value]]</b>';
				graph.type = 'column';
				graph.lineAlpha = 0;
				graph.fillAlphas = 0.8;
				graph.fillColors = caloriesColor;
				graph.labelText = '[[value]]';
				graph.legendValueText = 'Calories';
				chart.addGraph(graph);
				chart.addTitle('Calories per meal');
				valueAxis.stackType = 'regular';
				legend.valueWidth = 50;
				legend.data.push({
					title: 'Calories',
					color: caloriesColor
				});
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
			$scope.$watch(
				function() { return element.is(':visible');},
				function() {
					if(element.is(':visible'))
					{
						chart.validateNow();
					}});
		}

		return {
			restrict    : 'AE',
			scope       : {
				diet : '='},
			link        : link,
			templateUrl : 'directives/zDietChart'
		};
	});