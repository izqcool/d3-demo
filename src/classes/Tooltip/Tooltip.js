import * as d3 from 'd3';
import * as styles from './Tooltip.module.scss';


export class Tooltip {

  constructor(option) {
    Object.assign(this, option);
    this.padding = 30;
    this.offset= [20,20];
    this.rectWidth = 0;
    this.rectHeight = 0;
    this.parentHeight = 0;
    this.init();
  }

  init() {
    const {parentDom} = this;
    const {height} = parentDom.node().getBoundingClientRect();
    this.parentHeight = height;
  }


  show() {
    const {parentDom, tipText, padding} = this;
    const tipWrapper = parentDom.append('g')
    .attr('class', styles.show);

    const rect = tipWrapper.append('rect')
    .attr('class', styles.rect)
    .style('fill','#000')
    .attr('rx', 5)
    .attr('ry', 5)
    .style('stroke', "#999999")
    .style('opacity', 0.7);


    const text = tipWrapper.append('text')
    .attr('class', styles.text)
    .style('fill', '#fff')
    .text(()=>{
      return `${tipText}`;
    });

    const textSvgRect = d3.select(`.${styles.text}`).node().getBBox();
    const textWidth = textSvgRect.width;
    const textHeight = textSvgRect.height;

    this.rectWidth = textWidth + padding;
    this.rectHeight = textHeight + padding;

    rect.attr('width', this.rectWidth)
    .attr('height', this.rectHeight);

    text.attr('transform', `translate(${padding/2},${this.rectHeight/2+3})`);
  }

  setPos(x,y) {
    const {offset, rectWidth, rectHeight, parentHeight} = this;
    const [offsetX, offsetY] = offset;
    let transX =  x + offsetX;
    let transY =  y + offsetY;
    if(transX + rectWidth >= parentHeight) {
      transX = x - offsetX - rectWidth;
    }

    if(transY + rectHeight >= parentHeight) {
      transY = y - offsetY - rectHeight;
    }

    d3.select(`.${styles.show}`)
    .attr('transform', `translate(${transX},${transY})`);

  }

  hide() {
    const {parentDom} = this;
    parentDom.select(`.${styles.show}`).remove();
  }

}
