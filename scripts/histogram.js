function createHistogram(data) {
    const svg = d3.select("#histogramSvg");
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const bins = d3.bin()
        .domain([d3.min(data, d => d.High), d3.max(data, d => d.High)])
        .thresholds(10)(data.map(d => d.High));

    const x = d3.scaleLinear()
        .domain([d3.min(bins, d => d.x0), d3.max(bins, d => d.x1)])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .range([height, 0]);

    g.selectAll(".bar")
        .data(bins)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.x0))
        .attr("y", d => y(d.length))
        .attr("width", d => x(d.x1) - x(d.x0) - 1)
        .attr("height", d => height - y(d.length))
        .attr("fill", "#4cafb8")
        .on("mouseover", (event, d) => {
            tooltip.style("display", "block")
                .html(`Range: ${d.x0.toFixed(1)}°C - ${d.x1.toFixed(1)}°C<br>Count: ${d.length}`)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 10}px`);
        })
        .on("mouseout", () => tooltip.style("display", "none"));

    g.append("g").call(d3.axisLeft(y));
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => `${d}°C`));

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip");
}
