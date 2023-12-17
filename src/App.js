import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home-component/Home';
import NavBar from './components/navigation-component/NavBar';
import About from './components/about-component/About';
import Login from './components/login-component/Login';
import Signup from './components/sign-up-component/Signup';
import PasswordReset from './components/password-reset-component/PasswordReset';

const App = () => {
    // const [backendData, setBackendData] = useState([{}]);

    // useEffect(()=> {
    //   fetch("/api").then(
    //     response => response.json())
    //     .then(
    //       data => {
    //         setBackendData(data);
    //         console.log(data);
    //       }
    //     )
    // }, []);


  return ( 
    <div className="App">
      <Router>
        <NavBar/>
        <div className="content">
          <Switch>
            <Route exact path="/" >
              <Home/>
            </Route>
            <Route exact path="/about" >
              <About/>
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/signup">
              <Signup/>
            </Route>
            <Route exact path="/passwordReset">
              <PasswordReset/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
   );
}
 
export default App;

