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
import CartComponent from './components/user/cart'
import WishComponent from './components/user/wish'
import OrderRecordsComponent from './components/user/order'
import UserComponent from './components/user'
import {useSelector} from 'react-redux'
import {BrowserRouter as Router, Switch , Route} from 'react-router-dom'
import axios from 'axios'
import {authmiddleware} from './helper/authmiddleware'

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
                  // authmiddleware(props)
                  return <MainBody {...props} name={`Simple Online Shop Using ReactJs`} />
                }}>    
              </Route>
              <Route path="/profile"
                      render={(props)=>{
                          authmiddleware(props)
                          return <UserComponent {...props} />
                      }}
              >
              </Route>
              <Route path="/mycart"
                      render={(props)=>{
                          authmiddleware(props)
                          return <CartComponent {...props} />
                      }}
              >
              </Route>
              <Route path="/wishlist"
                     render={(props)=>{
                      authmiddleware(props)
                      return <WishComponent {...props} />
                  }}
              ></Route>

              <Route path="/orders"
                     render={(props)=>{
                      authmiddleware(props)
                      return <OrderRecordsComponent {...props} />
                  }}
              ></Route>

              <Route path="*" component={NotFoundComponent}></Route>

          </Switch>
        
      </div>
    </Router>
  );
}

export default App;
