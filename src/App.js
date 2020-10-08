import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/app.scss'


import HeaderNav from './components/headernav'
import MainBody from './components/main/mainbody'
import NotFoundComponent from './components/404'
import CartComponent from './components/user/cart'
import WishComponent from './components/user/wish'
import OrderRecordsComponent from './components/user/order'
import UserComponent from './components/user'
import {BrowserRouter as Router, Switch , Route} from 'react-router-dom'
import {authmiddleware} from './helper/authmiddleware'
import myLogo from './assets/mylogo.png'

const App = ()=> {

  return (
    <Router>
      <div className="App">
        <div id="content-wrap">
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
          <footer>
                <img style={{position: 'absolute', height: '4.5rem', width: '150px'}} src={myLogo} alt="mylogo"/>
          </footer>
          </div>
      </div>
    </Router>
  );
}

export default App;
