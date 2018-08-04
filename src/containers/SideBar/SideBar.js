import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import * as styles from './SideBar.module.scss';

export class SideBar extends React.Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  constructor(props){
    super(props);
    this.getNavs = this.getNavs.bind(this);
    this.getComponent = this.getComponent.bind(this);
  }

  getNavs() {
    const {history: {location: {pathname}}} = this.props;
    const path = pathname === '/' ? '/histogram' : pathname;

    const navs = [
      {
        path: '/histogram',
        text: '直方图',
        imgUrl: '/assets/img/chart-histogram.png',
        active: true
      },
      {
        path: '/pie',
        text: '饼状图',
        imgUrl: '/assets/img/pie-chart.png',
        active: false
      }
    ];

    return navs.map((nav,i)=>{
      return {
        ...nav,
        active: path.indexOf(nav.path) !==-1
      }
    });

  }

  getComponent(nav) {
    const classes = [
      styles.nav,
      ...(nav.active ? [styles.active] : []),
      'hint--right hint--rounded'
    ].join(' ').trim();

    return (
        <Link to={nav.path} className={classes} aria-label={nav.text}>
          <img src={nav.imgUrl} alt=""/>
          <span>{nav.text}</span>
        </Link>
    );
  }


  render() {
    const navs = this.getNavs();
    return (
        <div className={styles.container}>
          <div className={styles.navs}>
            {
              navs.map((nav,i)=>{
                return (
                    <div className={styles.nav_list} key={i}>
                      {this.getComponent(nav)}
                    </div>
                )
              })
            }
          </div>
        </div>
    )
  }
}