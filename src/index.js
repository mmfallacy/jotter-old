import React from 'react';
import ReactDOM from 'react-dom';
import './global.scss';

import App from './App';
import TimePicker from './components/TimePicker'

import * as serviceWorker from './serviceWorker';

import {Route, Switch} from 'react-router-dom';

import {MuiPickersUtilsProvider} from '@material-ui/pickers'

import MomentUtils from '@date-io/moment'

// CHANGE TO HASHROUTER ON PRODUCTION

import {BrowserRouter as Router} from 'react-router-dom'


ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <Router>
        <Switch>
          <Route path="/timepicker" component={TimePicker} />
          <Route exact path="/" component={App} />
          <Route path="*" render={()=><h1>"ERROR"</h1>} />
        </Switch>
      </Router>
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
);



function Providers({children}){
  return(
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {children}
    </MuiPickersUtilsProvider>
  )
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
