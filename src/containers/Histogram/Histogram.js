import React from 'react';
import * as d3 from 'd3';
import * as styles from './Histogram.module.scss';

export class Histogram extends React.Component {

  constructor(props) {
    super(props);
    this._render = this._render.bind(this);
  }

  componentDidMount() {
    this._render();
  }

  _render() {
    const dom = d3.select(`.${styles.containre}`);
    console.log(dom);
  }

  render() {
    return (
        <div className={styles.container}>

        </div>
    )
  }
}