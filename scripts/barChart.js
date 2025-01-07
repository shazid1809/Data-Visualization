function createBarChart(data) {
    const svg = d3.select("#barChartSvg");
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(data.map(d => d.Date))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.Date))
        .attr("y", d => y(d.Precipitation))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.Precipitation))
        .attr("fill", "#4cafb8")
        .on("mouseover", (event, d) => {
            d3.select(event.currentTarget).attr("fill", "#ff7043");
            tooltip.style("display", "block")
                .html(`Date: ${d.Date}<br>Precipitation: ${d.Precipitation}%`)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 10}px`);
        })
        .on("mouseout", event => {
            d3.select(event.currentTarget).attr("fill", "#4cafb8");
            tooltip.style("display", "none");
        });

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
