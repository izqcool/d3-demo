import React from 'react';
import * as d3 from 'd3';
import * as _ from 'lodash';
import * as styles from './Histogram.module.scss';

export class Histogram extends React.Component {
  oldStartColor = null;
  oldEndColor = null;
  ranged = null;
  oldData = null;
  translateArr = null;
  constructor(props) {
    super(props);
    this.state = {

    };
    this.init = this.init.bind(this);
    this.drawHistogram = this.drawHistogram.bind(this);
    this.resetColor = this.resetColor.bind(this);
    this.resetPos = this.resetPos.bind(this);
    this.findColorIndex = this.findColorIndex.bind(this);
    this.findIndex = this.findIndex.bind(this);
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
    if(nextProps.colorStart !== this.oldStartColor && nextProps.isRange === this.ranged) {
      this.oldStartColor = nextProps.colorStart;
      this.oldEndColor = nextProps.colorEnd;
      this.resetColor(nextProps.colorStart,nextProps.colorEnd);
      return false
    }else if(nextProps.isRange !== this.ranged) {
      this.ranged = nextProps.isRange;
      this.oldData = nextProps.data;
      this.drawHistogram(nextProps.data,nextProps.isRange);
      return true;
    }else if(nextProps.data[0].y !== this.oldData[0].y) {
      // const originOldData = this.oldData;
      this.resetPos(this.oldData,nextProps.data);
      return false;
    }else {
      return false;
    }

  }

  componentDidMount() {
    const {data,isRange} = this.props;
    this.drawHistogram(data,isRange);
  }

  init() {
    const {colorStart, colorEnd, isRange, data} = this.props;
    this.oldStartColor = colorStart;
    this.oldEndColor = colorEnd;
    this.ranged = isRange;
    this.oldData = data;
  }


  resetColor(start,end) {
    const {isRange,isSort,data} = this.props;
    const _this = this;



    //升序数组
    const ascData = _.sortBy(data,(ele) => ele.y);

    const newColors = d3.scaleLinear().domain([0, data.length-1]).range([start,end]);

    d3.selectAll('.rect')
      .each(function (d,i) {
        const colorIndex = _this.findColorIndex(d);
        let delayIndex;
        if(isRange) {
          delayIndex = i;
        }else {
          if(isSort) {
            delayIndex = colorIndex;
          }else {
            delayIndex = i;
          }
        }
        d3.select(this).transition()
          .duration(50)
          .delay(delayIndex*50)
          .style('fill',newColors(colorIndex));
      });
  }

  //
  resetPos(oldData,newData) {
    const _this = this;
    const {width, margin} = this.props;
    const _width = width - margin.left - margin.right;
    const xScale = d3.scaleBand().range([0,_width]).padding(.4).domain(oldData.map(d =>d.x1));
    const _xScale = d3.scaleBand().range([0,_width]).padding(.4).domain(newData.map(d =>d.x1));
    const g = d3.select('.canvas_g');

    g.selectAll('rect')
    .each(function (d,i) {
      d3.select(this)
        .transition()
        .duration(1400)
        .attr('transform',()=>{
          const _index = _this.findIndex(d,newData);
          const xWidth = xScale(d.x1);
          const _xWidth = _xScale(newData[_index].x1);
          const moveX =  _xWidth - xWidth;
          return `translate(${moveX},0)`;
        });
    });



    g.selectAll('.x-tick')
    .each(function (d,i) {
      d3.select(this)
      .transition()
      .duration(1400)
      .attr('transform',()=>{
        const _index = _this.findIndex(oldData[i],newData);
        const xWidth = xScale(oldData[i].x1);
        const _xWidth = _xScale(newData[_index].x1);
        const moveX =  _xWidth - xWidth;
        const posX = _this.translateArr[i] + moveX;
        return `translate(${posX},0)`;
      });
    });

  }

  findColorIndex(d) {
    const data = this.oldData;

    //升序数组
    const ascData = _.sortBy(data,(ele) => ele.y);

    const index = _.findIndex(ascData,(ele,i)=>{
      return d.y===ele.y && d.x1 === ele.x1;
    });
    return index;
  }

  findIndex(d, data) {
    const index = _.findIndex(data,(ele,i)=>{
      return d.y===ele.y && d.x1 === ele.x1;
    });
    return index;
  }



  drawHistogram(data,isRange) {
    let {width, height, margin} = this.props;
    const _this = this;
    const {oldStartColor, oldEndColor} = this;

    //clean this canvas
    d3.select(`.${styles.histogram}`).selectAll('*').remove();

    const colors = d3.scaleLinear().domain([0, data.length-1]).range([oldStartColor,oldEndColor]);

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

    g.selectAll('.xAxis').selectAll('.tick').attr('class','x-tick');

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
      .text(_.last(data.x2));

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

    }

    //记录x-tick 的初始位置
    if(!isRange) {
      let initPosArr = [];
      g.selectAll('.x-tick')
      .each(function (d,i) {
        const transValue = d3.select(this).attr("transform");
        const translateX = parseFloat(transValue.match(/translate\((.*)\)/)[1].split(',')[0]);
        initPosArr.push(translateX);
      });
      this.translateArr = initPosArr;
    }

    g.selectAll('.rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class','rect')
    .attr('x', d=>xScale(d.x1))
    .attr('y',_height)
    .style('fill',(d,i)=> {
      const _index = _this.findColorIndex(d);
      return colors(_index);
    })
    .attr('width',xScale.bandwidth())
    .attr('height',0);




    g.selectAll('rect')
    .transition()
    .duration(500)
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

