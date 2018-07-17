import React from 'react';
import * as styles from './HistogramCon.module.scss';

import {Histogram} from './Histogram';

export class HistogramCon extends React.Component {

  constructor(props) {
    super(props);
    this._render = this._render.bind(this);
  }

  componentDidMount() {
    this._render();
  }

  _render() {
    const data = [1,2,3,4,5,5,76,87,2,32,12,43,54,65,23,21,35,65,2,53,66,42,32,42];
    const dom = document.querySelector(`.${styles.chartWrapper}`);
    const histogram = new Histogram({
      dom,
      data,
      width:800,
      height:300,
      margin: {
        left: 40,
        right: 40,
        top: 30,
        bottom: 30
      }
    });
    histogram.render();
  }

  render() {
    return (
        <div className={styles.container}>
          <div className={styles.chartWrapper}>

          </div>
        </div>
    )
  }
}