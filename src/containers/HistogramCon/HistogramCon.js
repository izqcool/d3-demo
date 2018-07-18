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
    const data = [
      {
        x1: 0,
        x2: 5,
        y:10
      },
      {
        x1: 5,
        x2: 8,
        y:6
      },
      {
        x1: 8,
        x2: 15,
        y:27
      },
      {
        x1: 15,
        x2: 20,
        y:23
      },
      {
        x1: 20,
        x2: 25,
        y:8
      },
      {
        x1: 20,
        x2: 25,
        y:13
      },
      {
        x1: 25,
        x2: 30,
        y:16
      },
      {
        x1: 30,
        x2: 35,
        y:18
      },
    ];
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
      },
      isRange: true

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