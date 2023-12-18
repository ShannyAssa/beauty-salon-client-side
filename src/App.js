import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/HomePage/Home';
import NavBar from './components/NavBar/NavBar';
import About from './components/AboutPage/About';
import Login from './components/LoginPage/Login';
import Signup from './components/SignUpPage/Signup';
import PasswordReset from './components/PasswordResetPages/PasswordReset';

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

