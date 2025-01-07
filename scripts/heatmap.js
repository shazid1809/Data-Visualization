function createHeatmap(data) {
    const svg = d3.select("#heatmapSvg");
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(data.map(d => d.Date))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleBand()
        .domain(["High", "Low"])
        .range([0, height])
        .padding(0.1);

    const color = d3.scaleLinear()
        .domain([d3.min(data, d => d.Low), d3.max(data, d => d.High)])
        .range(["#4cafb8", "#ff7043"]);

    g.selectAll(".cell")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr("x", d => x(d.Date))
        .attr("y", (d, i) => (i % 2 === 0 ? y("High") : y("Low")))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .attr("fill", d => color(d.High))
        .on("mouseover", (event, d) => {
            tooltip.style("display", "block")
                .html(`Date: ${d.Date}<br>Temperature: ${d.High}°C`)
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
        

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip");
}
