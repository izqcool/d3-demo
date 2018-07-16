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


    //add canvas(svg)
    const svg = d3.select(this.dom).append('svg')
      .attr('class',styles.container)
      .attr('width',width)
      .attr('height',height);

    //绘图区域真实宽高
    const _width = width - margin.left - margin.right;
    const _height = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand().range([0,_width]).padding(.5);
    const yScale = d3.scaleLinear().range([_height,0]);
    console.log(xScale);


  }
}

