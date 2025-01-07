function createAreaChart(data) {
    const svg = d3.select("#areaChartSvg");
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
        .domain(d3.extent(data, d => new Date(d.Date)))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.High)])
        .range([height, 0]);

    const highArea = d3.area()
        .x(d => x(new Date(d.Date)))
        .y0(y(0))
        .y1(d => y(d.High))
        .curve(d3.curveMonotoneX);

    const lowArea = d3.area()
        .x(d => x(new Date(d.Date)))
        .y0(y(0))
        .y1(d => y(d.Low))
        .curve(d3.curveMonotoneX);

    g.append("path")
        .datum(data)
        .attr("fill", "#4cafb8")
        .attr("opacity", 0.7)
        .attr("d", highArea);

    g.append("path")
        .datum(data)
        .attr("fill", "#ff7043")
        .attr("opacity", 0.7)
        .attr("d", lowArea);

    g.append("g").call(d3.axisLeft(y));
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %d")));

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip");

    g.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(new Date(d.Date)))
        .attr("cy", d => y(d.High))
        .attr("r", 4)
        .attr("fill", "steelblue")
        .on("mouseover", (event, d) => {
            tooltip.style("display", "block")
                .html(`Date: ${d.Date.toLocaleDateString()}<br>High: ${d.High}°C`)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 10}px`);
        })
        .on("mouseout", () => tooltip.style("display", "none"));
}
