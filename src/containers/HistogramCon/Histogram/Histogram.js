import React from 'react';
import * as d3 from 'd3';
import * as styles from './Histogram.module.scss';

export class Histogram {
  constructor(options) {
    if(!options ||
      typeof options.dom === 'undefined' ||
      typeof options.data === 'undefined'
    ) {
      throw Error('dom and data must be set');
    }

    this.init(options);
  }

  init(options) {
    this.dom = options.dom;
    this.data = options.data;
    this.width = options.width;
    this.height = options.height;
    this.margin = options.margin || {top:0, right:0, bottom:0, left: 0};
    this.xName = options.xName;
    this.yName = options.yName;
  }

  render() {
    console.log(this);
    //clean this canvas
    d3.select(this.dom).selectAll('*').remove();

    let {data, width, height, margin} = this;
    const hisData = d3.histogram()(data);
    const min = d3.min(data);
    const max = d3.max(data);


    //add canvas(svg)
    const svg = d3.select(this.dom).append('svg')
      .attr('class',styles.container)
      .attr('width',width)
      .attr('height',height);

    const g = svg.append('g');
    g.attr('transform',`translate(${margin.left},${margin.top})`);

    //绘图区域真实宽高
    const _width = width - margin.left - margin.right;
    const _height = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand().range([0,_width]).padding(.5).domain(hisData.map(d =>d.x1));
    const yScale = d3.scaleLinear().range([_height,0]);
    yScale.domain([0,d3.max(hisData, d => d.length)]);

    const xBar = d3.axisBottom(xScale);
    const yBar = d3.axisLeft(yScale);

    console.log(hisData);

    g.append('g')
      .attr('class',`xAxis ${styles.axis}`)
      .attr('transform',`translate(0,${_height})`)
      .call(xBar);

    g.append('g')
    .attr('class',`yAxis ${styles.axis}`)
    .call(yBar);

    g.selectAll('.rect')
      .data(hisData)
      .enter()
      .append('rect')
      .attr('class',styles.bar)
      .attr('class','rect')
      // .attr('x', (d,i) => {
      //   console.log(i);
      //   console.log(xScale(d.x0));
      //   if(i===0) {
      //     return xScale(d.x1) - xScale.bandwidth()+ xScale.paddingOuter();
      //   }else {
      //     console.log(xScale.bandwidth());
      //     return xScale(d.x1) - xScale.bandwidth();
      //
      //   }
      //
      // })
      .attr('x',0)
      .attr('y',_height)
      .attr('width',xScale.bandwidth())
      .attr('height',0);

    g.selectAll('rect')
      .each(function (d,i) {
        d3.select(this).attr('transform',()=>{
          let xWidth = 0;
          if(i===0) {
            console.log(d);
            console.log(d.x0);
            console.log(d.x1);
            console.log(xScale(20));
            xWidth = xScale(d.x1) - xScale(0);
          }else {
            xWidth = xScale.paddingOuter() * xScale.step() + (i - 1) * xScale.step() + xScale.bandwidth() + (xScale.paddingInner() * xScale.step())/2;
          }
          return `translate(${xWidth},0)`
        });
      });

    g.selectAll('rect')
      .transition()
      .duration(500)
      // .attr('height', d=> _height - yScale(d.y))
      .attr('height', d=> _height - yScale(d.length))
      .attr('y', d=>yScale(d.length));









  }
}

