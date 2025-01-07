function createPieChart(data) {
    const svg = d3.select("#pieChartSvg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const radius = Math.min(width, height) / 2;

    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

    const weatherCounts = d3.rollup(data, v => v.length, d => d.Description);
    const pieData = Array.from(weatherCounts, ([key, value]) => ({ key, value }));

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Draw Pie Slices
    g.selectAll(".slice")
        .data(pie(pieData))
        .enter()
        .append("path")
        .attr("class", "slice")
        .attr("d", arc)
        .attr("fill", d => color(d.data.key))
        .on("mouseover", (event, d) => {
            tooltip.style("display", "block")
                .html(`${d.data.key}: ${d.data.value}`)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 10}px`);
        })
        .on("mouseout", () => tooltip.style("display", "none"));

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip");
}
