const chart = new CanvasJS.Chart("statusLog",{
  animationEnabled: true,
  theme: "light2",
  title:{
    text: "使用率"
  },
  toolTip:{
    shared: true
  },
  axisX:{
    labelAngle: 0,
    crosshair:{
      enabled: true,
      snapToDataPoint: true,
      valueFormatString: "HH:mm"
    }
  },
  axisY: {
    valueFormatString: "#0.#%",
  },
  legend: {
    cursor: "pointer",
    itemclick: (e)=>{
      if(typeof (e.dataSeries.visible) === "undefined"||e.dataSeries.visible){
        e.dataSeries.visible = false;
      }else{
        e.dataSeries.visible = true;
      }

      e.chart.render();
    }
  },
  data: [{
    type: "splineArea",
    showInLegend: "true",
    name: "CPU",
    yValueFormatString: "#0.#%",
    color: "#64b5f6",
    xValueType: "dateTime",
    xValueFormatString: "DD MMM YY HH:mm",
    legendMarkerType: "square",
    dataPoints: userDps
  },
  {
    type: "splineArea",
    showInLegend: "true",
    name: "メモリ",
    yValueFormatString: "#0.#%",
    color: "#2196f3",
    xValueType: "dateTime",
    xValueFormatString: "DD MMM YY HH:mm",
    legendMarkerType: "square",
    dataPoints: userDps
  }]
});

chart.render();