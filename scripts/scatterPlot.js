function createScatterPlot(data) {
    const svg = d3.select("#scatterPlotSvg");
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Precipitation)])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([d3.min(data, d => d.High), d3.max(data, d => d.High)])
        .range([height, 0]);

    // Scatter Plot Points
    g.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.Precipitation))
        .attr("cy", d => y(d.High))
        .attr("r", 5)
        .attr("fill", "#4cafb8")
        .on("mouseover", (event, d) => {
            tooltip.style("display", "block")
                .html(`Date: ${d.Date.toLocaleDateString()}<br>Precipitation: ${d.Precipitation}%<br>High: ${d.High}°C`)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 10}px`);
        })
        .on("mouseout", () => tooltip.style("display", "none"));

    // Axes
    g.append("g").call(d3.axisLeft(y));
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip");
}
