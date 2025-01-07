function createLineChart(data) {
    const svg = d3.select("#lineChartSvg");
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
        .domain(d3.extent(data, d => new Date(d.Date)))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([d3.min(data, d => d.Low), d3.max(data, d => d.High)])
        .range([height, 0]);

    const lineHigh = d3.line()
        .x(d => x(new Date(d.Date)))
        .y(d => y(d.High));

    const lineLow = d3.line()
        .x(d => x(new Date(d.Date)))
        .y(d => y(d.Low));

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", lineHigh);

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("d", lineLow);

    g.append("g").call(d3.axisLeft(y));
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %d")));

    const tooltip = d3.select("body").append("div")
        .style("position", "absolute")
        .style("background", "#f9f9f9")
        .style("border", "1px solid #ccc")
        .style("padding", "5px")
        .style("border-radius", "5px")
        .style("display", "none");

    g.selectAll(".circle-high")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "circle-high")
        .attr("cx", d => x(new Date(d.Date)))
        .attr("cy", d => y(d.High))
        .attr("r", 5)
        .attr("fill", "steelblue")
        .on("mouseover", (event, d) => {
            tooltip.style("display", "block")
                .html(`Date: ${d.Date}<br>High: ${d.High}`)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 10}px`);
        })
        .on("mouseout", () => tooltip.style("display", "none"));

    g.selectAll(".circle-low")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "circle-low")
        .attr("cx", d => x(new Date(d.Date)))
        .attr("cy", d => y(d.Low))
        .attr("r", 5)
        .attr("fill", "red")
        .on("mouseover", (event, d) => {
            tooltip.style("display", "block")
                .html(`Date: ${d.Date}<br>Low: ${d.Low}`)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 10}px`);
        })
        .on("mouseout", () => tooltip.style("display", "none"));
}
