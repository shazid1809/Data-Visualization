d3.csv("data/weather.csv").then(data => {
    console.log("Loaded Data:", data);

    data.forEach(d => {
        d.Date = new Date(d.Date); 
        d.High = +d.High; 
        d.Low = +d.Low; 
        d.Precipitation = +d.Precipitation; 
    });

    console.log("Parsed Data for Charts:", data);

    createLineChart(data);
    createBarChart(data);
    createHeatmap(data);
    createPieChart(data);
    createScatterPlot(data);
    createStackedBarChart(data);
    createHistogram(data);
    createAreaChart(data); 

}).catch(error => {
    console.error("Error loading CSV:", error);
});
