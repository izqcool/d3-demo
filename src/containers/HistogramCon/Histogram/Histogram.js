import React from 'react';
import * as d3 from 'd3';
import * as _ from 'lodash';
import * as styles from './Histogram.module.scss';

export class Histogram extends React.Component {
  oldStartColor = null;
  oldEndColor = null;
  constructor(props) {
    super(props);
    this.state = {

    };
    this.init = this.init.bind(this);
    this.drawHistogram = this.drawHistogram.bind(this);
    this.reSetColor = this.reSetColor.bind(this);
    this.init();
  }


  // init(options) {
  //   this.dom = options.dom;
  //   this.data = options.data;
  //   this.width = options.width;
  //   this.height = options.height;
  //   this.margin = options.margin || {top:0, right:0, bottom:0, left: 0};
  //   this.isRange = options.isRange || false;
  //   this.xName = options.xName;
  //   this.yName = options.yName;
  //   this.colorStart = options.colorStart;
  //   this.colorEnd = options.colorEnd;
  // }

  shouldComponentUpdate(nextProps) {
    if(nextProps.colorStart !== this.oldStartColor) {
      this.reSetColor(nextProps.colorStart,nextProps.colorEnd);
      this.oldStartColor = nextProps.colorStart;
      this.oldEndColor = nextProps.colorEnd;
    }

    return false;
  }

  componentDidMount() {
    this.drawHistogram();
  }

  init() {
    const {colorStart, colorEnd} = this.props;
    this.oldStartColor = colorStart;
    this.oldEndColor = colorEnd;
  }


  reSetColor(start,end) {
    const {data} = this.props;
    const newColors = d3.scaleLinear().domain([0, data.length-1]).range([start,end]);
    const g = d3.select('.canvas_g');

    d3.selectAll('.rect')
      .each(function (d,i) {
        d3.select(this).transition()
          .duration(90)
          .delay(i*40)
          .style('fill',newColors(i));
      });
  }

  drawHistogram() {
    let {data, width, height, margin, isRange} = this.props;
    const {oldStartColor, oldEndColor} = this;
    //clean this canvas
    d3.select(`.${styles.histogram}`).selectAll('*').remove();

    // const colors = d3.scaleOrdinal(['#5A2999','red','#A2F14A']);
    const colors = d3.scaleLinear().domain([0, data.length-1]).range([oldStartColor,oldEndColor]);

    // const min = d3.min(data, ele => ele.y);
    const max = d3.max(data, ele => ele.y);

    //add canvas(svg)
    const svg = d3.select(`.${styles.histogram}`).append('svg')
    .attr('class',styles.container)
    .attr('width',width)
    .attr('height',height);

    const g = svg.append('g').attr('class','canvas_g');
    g.attr('transform',`translate(${margin.left},${margin.top})`);

    //绘图区域真实宽高
    const _width = width - margin.left - margin.right;
    const _height = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand().range([0,_width]).padding(.4).domain(data.map(d =>d.x1));
    const yScale = d3.scaleLinear().range([_height,0]).domain([0,max]);

    const xBar = d3.axisBottom(xScale);
    const yBar = d3.axisLeft(yScale);

    g.append('g')
    .attr('class',`xAxis ${styles.axis}`)
    .attr('transform',`translate(0,${_height})`)
    .call(xBar);

    g.append('g')
    .attr('class',`yAxis ${styles.axis}`)
    .call(yBar);

    if(isRange) {
      const text = g.select('.xAxis')
      .append('g')
      .attr('class','tick')
      .style('opacity', 1)
      .append('text')
      .attr('fill','#000')
      .attr('x',0.5)
      .attr('y',9)
      .attr('dy','0.75em')
      .text(_.last(data.x2))
    }

    g.selectAll('.rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class','rect')
    .attr('x', d=>xScale(d.x1))
    .attr('y',_height)
    .style('fill',(d,i)=>colors(i))
    .attr('width',xScale.bandwidth())
    .attr('height',0);


    //在X轴上等分每个区间
    g.selectAll('.xAxis .tick')
    .each(function (d,i) {
      d3.select(this).attr('transform',()=>{
        let xWidth = 0;
        if(i===0) {
          xWidth = 0;
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
    .attr('height', d=> _height - yScale(d.y))
    .attr('y', d=>yScale(d.y));
  }

  render() {
    return (
        <div className={styles.histogram}>
        </div>
    )
  }
}

