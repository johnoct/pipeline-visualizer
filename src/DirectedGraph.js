import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import yaml from 'js-yaml';
import { Tooltip as ReactTooltip } from "react-tooltip";

const DirectedGraph = ({ pipeline }) => {
    const tasks = pipeline.spec.tasks;
    const svgRef = useRef();
    const tooltipRef = useRef();

    useEffect(() => {
        if (!svgRef.current) {
            return;
        }

        const width = 800;
        const height = 500;

        const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

        const nodeObjects = [
            { id: pipeline.metadata.name, group: 0 },
            ...tasks.map((task, index) => ({ id: task.name, group: index + 1 })),
        ];

        const nodeById = new Map(nodeObjects.map((node) => [node.id, node]));

        const links = tasks.map((task, index) => {
            const source = index === 0 ? pipeline.metadata.name : tasks[index - 1].name;
            const target = task.name;
            return { source: nodeById.get(source), target: nodeById.get(target), value: 1 };
        });




        const simulation = d3
            .forceSimulation(nodeObjects)
            .force('link', d3.forceLink(links).distance(100))
            .force('charge', d3.forceManyBody().strength(-500))
            .force('center', d3.forceCenter(width / 2, height / 2));

        const link = svg
            .selectAll('.link')
            .data(links)
            .enter()
            .append('line')
            .attr('class', 'link')
            .style('stroke', '#999')
            .style('stroke-opacity', 0.6)
            .style('stroke-width', 2);

        const node = svg
            .selectAll('.node')
            .data(nodeObjects)
            .enter()
            .append('g')
            .attr('class', 'node')
            .call(drag(simulation));

        node
            .append('circle')
            .attr('r', 20)
            .style('fill', (d) => (d.type === 'pipeline' ? '#69b3a2' : '#4285F4'))
            .style('stroke', '#fff')
            .style('stroke-width', 1.5);

        node
            .append('text')
            .attr('dy', 3)
            .attr('text-anchor', 'middle')
            .text((d) => d.id)
            .style('fill', '#333')
            .style('font-family', 'Arial')
            .style('font-size', 12);

        node.filter((d) => d.type === 'task').on('mouseover', (event, d) => {
            ReactTooltip.show(tooltipRef.current);
            tooltipRef.current.innerHTML = `<pre>${yaml.dump(d.task)}</pre>`;
        });

        node.on('mouseout', () => {
            ReactTooltip.hide(tooltipRef.current);
        });

        simulation.on('tick', () => {
            link.attr('x1', (d) => d.source.x).attr('y1', (d) => d.source.y).attr('x2', (d) => d.target.x).attr('y2', (d) => d.target.y);

            node.attr('transform', (d) => `translate(${d.x},${d.y})`);
        });

        function drag(simulation) {
            function dragstarted(event) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }
            function dragged(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }

            return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragged);
        }
    }, [pipeline, tasks]);

    return (
        <>
            <ReactTooltip id="task-tooltip" place="top" effect="solid" getContent={(dataTip) => dataTip} />
            <svg ref={svgRef}></svg>
            <div ref={tooltipRef} style={{ display: 'none' }}></div>
        </>
    );
};

export default DirectedGraph;
