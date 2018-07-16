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
    const dom = document.querySelector(`.${styles.chartWrapper}`);
    const histogram = new Histogram({
      dom,
      data: {

      },
      width:800,
      height:500
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