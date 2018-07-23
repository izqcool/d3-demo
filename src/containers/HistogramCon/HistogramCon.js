import React from 'react';
import * as _ from 'lodash';
import * as styles from './HistogramCon.module.scss';

import {Histogram} from './Histogram';

const rangeData = [
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
  {
    x1: 35,
    x2: 40,
    y:30
  },

  {
    x1: 40,
    x2: 46,
    y:42
  },
  {
    x1: 46,
    x2: 50,
    y:34
  },
  {
    x1: 50,
    x2: 55,
    y:23
  },
  {
    x1: 55,
    x2: 60,
    y:64
  },
  {
    x1: 60,
    x2: 65,
    y:53
  },
  {
    x1: 65,
    x2: 70,
    y:12
  },
  {
    x1: 70,
    x2: 75,
    y:34
  },
  {
    x1: 75,
    x2: 80,
    y:45
  },
  {
    x1: 80,
    x2: 85,
    y:61
  }
];

const notRangeData= [
  {
    x1: '草莓',
    y: 20
  },
  {
    x1: '香蕉',
    y: 39
  },
  {
    x1: '菠萝',
    y: 42
  },
  {
    x1: '西瓜',
    y: 54
  },
  {
    x1: '苹果',
    y: 52
  },
  {
    x1: '樱桃',
    y: 12
  },
  {
    x1: '石榴',
    y: 85
  },
  {
    x1: '荔枝',
    y: 124
  },
  {
    x1: '芒果',
    y: 56
  },
  {
    x1: '榴莲',
    y: 96
  }
];

export class HistogramCon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: rangeData,
      tabName: '分区间',
      isRange: true,
      activeItem: 'GREEN',
      colorStart: '#F5FEAB',
      colorEnd: '#2A9543'
    };
    this.getBtnItems = this.getBtnItems.bind(this);
    this.onClickBtn = this.onClickBtn.bind(this);
    this.onClickTab = this.onClickTab.bind(this);
    this.resetData = this.resetData.bind(this);
  }

  getBtnItems() {
    const {isRange,activeItem} = this.state;
    const commonsItem = [
      {
        type: 'RED',
        clickEvent: ()=>this.onClickBtn('RED'),
        active: false,
      },
      {
        type: 'GREEN',
        clickEvent: ()=>this.onClickBtn('GREEN'),
        active: false,
      },
      {
        type: 'WARM',
        clickEvent: ()=>this.onClickBtn('WARM'),
        active: false,
      },
      {
        type: 'COOL',
        clickEvent: ()=>this.onClickBtn('COOL'),
        active: false,
      }
    ];

    const notRangeItem = [
      {
        type: 'X ASC',
        clickEvent: ()=>this.onClickBtn('X ASC'),
        active: false,
      },
      {
        type: 'X DESC',
        clickEvent: ()=>this.onClickBtn('COOL'),
        active: false,
      },
      {
        type: 'Y ASC',
        clickEvent: ()=>this.onClickBtn('Y ASC'),
        active: false,
      },
      {
        type: 'Y DESC',
        clickEvent: ()=>this.onClickBtn('COOL'),
        active: false,
      },
    ];

    const items = [
        ...(!isRange ? notRangeItem: []),
        ...commonsItem
    ];

    return items.map((item)=>{
      return {
        ...item,
        active: activeItem === item.type
      }
    });



  }

  resetData(type) {
    const {data} = this.state;
    let newData;
    switch (type) {
      case 'Y ASC':
        newData = _.sortBy(data, (item)=>{return item.y});
        break;
    }
    return newData;
  }

  onClickBtn(type) {
    switch (type) {
      case 'RED':
        this.setState({
          activeItem: 'RED',
          colorStart: '#FEDD0A',
          colorEnd: '#FC3F25'
        });
        break;

      case 'GREEN':
        this.setState({
          activeItem: 'GREEN',
          colorStart: '#F5FEAB',
          colorEnd: '#2A9543'
        });
        break;

      case 'WARM':
        this.setState({
          activeItem: 'WARM',
          colorStart: '#831599',
          colorEnd: '#FC6A32'
        });
        break;

      case 'COOL':
        this.setState({
          activeItem: 'COOL',
          colorStart: '#5A2999',
          colorEnd: '#27E287'
        });
        break;

      case 'Y ASC':
        this.setState({
          data: this.resetData('Y ASC')
          // activeItem: 'COOL',
          // colorStart: '#5A2999',
          // colorEnd: '#27E287'
        });
        break;
    }

  }

  onClickTab() {
    const {isRange} = this.state;
    this.setState({
      isRange: !isRange,
      tabName: isRange ? '不分区间' : '分区间',
      data: isRange ? notRangeData : rangeData
    });

  }



  render() {
    const {data, isRange,colorStart,colorEnd,tabName} = this.state;
    const items = this.getBtnItems();
    const props = {
      data,
      width:800,
      height:300,
      margin: {
        left: 40,
        right: 40,
        top: 30,
        bottom: 30
      },
      isRange,
      colorStart,
      colorEnd
    };
    return (
        <div className={styles.container}>
          <div className={styles.btn}>
            <div className={styles.btn_items} onClick={this.onClickTab}>{tabName}</div>
            {
              items.map((item,i)=>{
                return <button key={i}
                               className={`${item.active ? styles.active: ''} ${styles.btn_items}`}
                               onClick={item.clickEvent}>{item.type}
                               </button>
              })
            }
          </div>
          <Histogram {...props} />
        </div>
    )
  }
}