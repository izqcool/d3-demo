import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import * as styles from './App.module.scss';

import {SideBar} from '../SideBar';


export class App extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  render() {
    const {history} = this.props;
    return (
        <div className={styles.container}>
          <SideBar history={history}/>
          <div className={styles.right}>
            dasdasd
          </div>
        </div>
    );
  }
}
