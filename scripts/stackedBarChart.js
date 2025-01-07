function createStackedBarChart(data) {
    const svg = d3.select("#stackedBarChartSvg");
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(data.map(d => d.Date))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([d3.min(data, d => d.Low), d3.max(data, d => d.High)]) 
        .range([height, 0]);

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip");

    g.selectAll(".bar-high")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar-high")
        .attr("x", d => x(d.Date))
        .attr("y", d => y(d.High)) 
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.High)) 
        .attr("fill", "#4cafb8") 
        .on("mouseover", (event, d) => {
            tooltip.style("display", "block")
                .html(`Date: ${d.Date.toLocaleDateString()}<br>High: ${d.High}°C`)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 10}px`);
        })
        .on("mouseout", () => tooltip.style("display", "none"));

    g.selectAll(".bar-low")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar-low")
        .attr("x", d => x(d.Date))
        .attr("y", d => d.Low >= 0 ? y(d.Low) : y(0)) 
        .attr("width", x.bandwidth())
        .attr("height", d => Math.abs(y(d.Low) - y(0))) 
        .attr("fill", d => d.Low >= 0 ? "#ff7043" : "#1e40af") 
        .on("mouseover", (event, d) => {
            tooltip.style("display", "block")
                .html(`Date: ${d.Date.toLocaleDateString()}<br>Low: ${d.Low}°C`)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 10}px`);
        })
        .on("mouseout", () => tooltip.style("display", "none"));

    g.append("g").call(d3.axisLeft(y));
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %d")))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");
}
