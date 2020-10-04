import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/app.scss'

import { Button } from 'react-bootstrap';

// import * as RB from 'react-bootstrap';

import HeaderNav from './components/headernav'
import MainBody from './components/main/mainbody'
import NotFoundComponent from './components/404'
import {useSelector} from 'react-redux'
import {BrowserRouter as Router, Switch , Route} from 'react-router-dom'
import axios from 'axios'

const App = ()=> {

  const temptoken = useSelector(state=>state.user.token)
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  axios.defaults.headers.common["Accept"] = 'application/json'
  axios.defaults.headers.common["Authorization"] = `Bearer ${temptoken}`
 
  return (
    <Router>
      <div className="App">
          <HeaderNav/>
          <Switch>
              {/* <Route path="/" exact component={MainBody}></Route> */}
              <Route path="/"  exact 
                render={(props) => {
                  console.log("Do some Authorization logic or code here before mounting the component")
                  return <MainBody {...props} name={`Simple Online Shop Using ReactJs`} />
                }}>    
              </Route>
              <Route path="*" component={NotFoundComponent}></Route>

          </Switch>
        
      </div>
    </Router>
  );
}

export default App;
