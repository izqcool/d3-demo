import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {App} from './containers';

import './vendors';
import registerServiceWorker from './registerServiceWorker';

const VDom = (
    <Router>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
);

ReactDOM.render(VDom, document.getElementById('root'));
registerServiceWorker();
