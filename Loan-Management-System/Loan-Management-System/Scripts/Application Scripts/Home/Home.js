$(document).ready(function () {

	$(".chartContainer").CanvasJSChart({
		title: {
			text: "Monthly Interest - 2024"
		},
		axisY: {
			title: "Monthly Interest in R",
			includeZero: false
		},
		axisX: {
			interval: 1
		},
		data: [
			{
				type: "line", //try changing to column, area
				toolTipContent: "{label}: {y} R",
				dataPoints: [
					{ label: "Jan", y: 10000},
					{ label: "Feb", y: 12000 },
					{ label: "March", y: 15000 }
					//{ label: "April", y: 4.81 },
					//{ label: "May", y: 2.37 },
					//{ label: "June", y: 2.33 },
					//{ label: "July", y: 3.06 },
					//{ label: "Aug", y: 2.94 },
					//{ label: "Sep", y: 5.41 },
					//{ label: "Oct", y: 2.17 },
					//{ label: "Nov", y: 2.17 },
					//{ label: "Dec", y: 2.80 }
				]
			}
		]
	});
})