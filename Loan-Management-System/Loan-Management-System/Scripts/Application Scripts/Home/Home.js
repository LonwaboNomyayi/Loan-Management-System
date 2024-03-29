$(document).ready(function () {
	$.ajax({
		type: "GET",
		url: "/Loan/GetLoanTotalsForCurrentMonth/",
		data: "{}",
		success: function (data) {
			if (data.data != null) {
				//bind the data 
				if (data.data != false) {
					var format = new Intl.NumberFormat('en-ZA', {
						style: 'currency',
						currency: 'ZAR',
						minimumFractionDigits: 2
					});

					var totalLoanedAmount = format.format(data.data.TotalLoanedAmount);
					var totalReturnAmount = format.format(data.data.TotalReturnAmount);
					var totalInterest = format.format(data.data.TotalInterest);


					$('#TotalLoan').text(totalLoanedAmount);
					$('#TotalReturn').text(totalReturnAmount);
					$('#LoanInterest').text(totalInterest)
				}
				else {
					//that means that the session is expired 
					window.location.href = "/Account/Signin";
                }
			}
			else {
				//do nothing
            }
		}
	})

	var monthDataInterest = [
		{ label: "Jan", y: 0 },
		{ label: "Feb", y: 0 },
		{ label: "March", y: 0 },
		{ label: "April", y: 0 },
		{ label: "May", y: 0},
		{ label: "June", y: 0 },
		{ label: "July", y: 0 },
		{ label: "Aug", y: 0 },
		{ label: "Sep", y: 0 },
		{ label: "Oct", y: 0 },
		{ label: "Nov", y: 0 },
		{ label: "Dec", y: 0 }
	];

	var monthDataCreditFacilities = [
		{ label: "Jan", y: 0 },
		{ label: "Feb", y: 0 },
		{ label: "March", y: 0 },
		{ label: "April", y: 0 },
		{ label: "May", y: 0 },
		{ label: "June", y: 0 },
		{ label: "July", y: 0 },
		{ label: "Aug", y: 0 },
		{ label: "Sep", y: 0 },
		{ label: "Oct", y: 0 },
		{ label: "Nov", y: 0 },
		{ label: "Dec", y: 0 }
	];

	var monthDataReturnLoanTotal = [
		{ label: "Jan", y: 0 },
		{ label: "Feb", y: 0 },
		{ label: "March", y: 0 },
		{ label: "April", y: 0 },
		{ label: "May", y: 0 },
		{ label: "June", y: 0 },
		{ label: "July", y: 0 },
		{ label: "Aug", y: 0 },
		{ label: "Sep", y: 0 },
		{ label: "Oct", y: 0 },
		{ label: "Nov", y: 0 },
		{ label: "Dec", y: 0 }
	];

	var monthDataLossRatio = [
		{ label: "Jan", y: 0 },
		{ label: "Feb", y: 0 },
		{ label: "March", y: 0 },
		{ label: "April", y: 0 },
		{ label: "May", y: 0 },
		{ label: "June", y: 0 },
		{ label: "July", y: 0 },
		{ label: "Aug", y: 0 },
		{ label: "Sep", y: 0 },
		{ label: "Oct", y: 0 },
		{ label: "Nov", y: 0 },
		{ label: "Dec", y: 0 }
	];


	$.ajax({
		type: "GET",
		url: "/Loan/GetLineGraphInfoSummaries/",
		data: "{}",
		success: function (data) {
			if (data.data != null) {
				$.each(data.data, function (k, item) {
					monthDataInterest[item.MonthIndex - 1].y = item.LoanReceivedInterestPerMonth;
					monthDataCreditFacilities[item.MonthIndex - 1].y = item.CreditFacilitiesPerMonth;
					monthDataReturnLoanTotal[item.MonthIndex - 1].y = item.ReturnedLoanTotalPerMonth;
					monthDataLossRatio[item.MonthIndex - 1].y = item.TotalLossRatio
				});

				var month = (new Date).getMonth() + 1;

				monthDataInterest.splice(month, monthDataInterest.length - month);
				monthDataCreditFacilities.splice(month, monthDataCreditFacilities.length - month);
				monthDataReturnLoanTotal.splice(month, monthDataReturnLoanTotal.length - month);
				monthDataLossRatio.splice(month, monthDataLossRatio.length - month);

				$(".chartContainer").CanvasJSChart({
					title: {
						text: "Monthly Interest - 2024"
					},
					axisY: {
						title: "Rands",
						includeZero: false
					},
					axisX: {
						interval: 1
					},
					data: [
						{
							type: "line", //try changing to column, area
							toolTipContent: "{label}: ZAR {y} Interest",
							dataPoints: monthDataInterest
						},
						{
							type: "line", //try changing to column, area
							toolTipContent: "{label}: ZAR {y} Credit Facility",
							dataPoints: monthDataCreditFacilities
						},
						{
							type: "line", //try changing to column, area
							toolTipContent: "{label}: ZAR {y} Total Paid",
							dataPoints: monthDataReturnLoanTotal
						}
					]
				});


				//Ratio
				$("#chartContainerBarGraph").CanvasJSChart({
					title: {
						text: "Loss Ratio - 2024"
					},
					axisY: {
						title: "Loss Ratio in %",
						includeZero: false
					},
					axisX: {
						interval: 1
					},
					data: [
						{
							type: "line", //try changing to column, area
							toolTipContent: "{Loss Ratio}: {y} %",
							dataPoints: monthDataLossRatio
						}
					]
				});
            }
		}

	});



	


	//var chart = new CanvasJS.Chart("chartContainerBarGraph", {
	//	animationEnabled: true,
	//	title: {
	//		text: "Olympic Medals of all Times (till 2016 Olympics)"
	//	},
	//	axisY: {
	//		title: "Medals",
	//		includeZero: true
	//	},
	//	legend: {
	//		cursor: "pointer",
	//		itemclick: toggleDataSeries
	//	},
	//	toolTip: {
	//		shared: true,
	//		content: toolTipFormatter
	//	},
	//	data: [{
	//		type: "bar",
	//		showInLegend: true,
	//		name: "Gold",
	//		color: "gold",
	//		dataPoints: [
	//			{ y: 243, label: "Italy" },
	//			{ y: 236, label: "China" },
	//			{ y: 243, label: "France" },
	//			{ y: 273, label: "Great Britain" },
	//			{ y: 269, label: "Germany" },
	//			{ y: 196, label: "Russia" },
	//			{ y: 1118, label: "USA" }
	//		]
	//	},
	//	{
	//		type: "bar",
	//		showInLegend: true,
	//		name: "Silver",
	//		color: "silver",
	//		dataPoints: [
	//			{ y: 212, label: "Italy" },
	//			{ y: 186, label: "China" },
	//			{ y: 272, label: "France" },
	//			{ y: 299, label: "Great Britain" },
	//			{ y: 270, label: "Germany" },
	//			{ y: 165, label: "Russia" },
	//			{ y: 896, label: "USA" }
	//		]
	//	},
	//	{
	//		type: "bar",
	//		showInLegend: true,
	//		name: "Bronze",
	//		color: "#A57164",
	//		dataPoints: [
	//			{ y: 236, label: "Italy" },
	//			{ y: 172, label: "China" },
	//			{ y: 309, label: "France" },
	//			{ y: 302, label: "Great Britain" },
	//			{ y: 285, label: "Germany" },
	//			{ y: 188, label: "Russia" },
	//			{ y: 788, label: "USA" }
	//		]
	//	}]
	//});
	//chart.render();

	



})

function toolTipFormatter(e) {
	var str = "";
	var total = 0;
	var str3;
	var str2;
	for (var i = 0; i < e.entries.length; i++) {
		var str1 = "<span style= \"color:" + e.entries[i].dataSeries.color + "\">" + e.entries[i].dataSeries.name + "</span>: <strong>" + e.entries[i].dataPoint.y + "</strong> <br/>";
		total = e.entries[i].dataPoint.y + total;
		str = str.concat(str1);
	}
	str2 = "<strong>" + e.entries[0].dataPoint.label + "</strong> <br/>";
	str3 = "<span style = \"color:Tomato\">Total: </span><strong>" + total + "</strong><br/>";
	return (str2.concat(str)).concat(str3);
}

function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
	chart.render();
}