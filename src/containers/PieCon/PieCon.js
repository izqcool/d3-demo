import React from 'react';
import * as styles from './PieCon.module.scss';
import {Pie} from 'react-d3-pie';

export class PieCon extends React.Component {

  render() {
    return (
        <div className={styles.container}>
          <Pie width={500}
               height={400}
               innerRadius={0.4}
               outerRadius={0.8}
          />
        </div>
    )
  }
}