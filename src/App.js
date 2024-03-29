import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/HomePage/Home';
import NavBar from './components/NavBar/NavBar';
import About from './components/AboutPage/About';
import Login from './components/LoginPage/Login';
import Signup from './components/SignUpPage/Signup';
import PasswordReset from './components/PasswordResetPages/PasswordReset';
import Profile from './components/CustomerPages/Profile';
import Treatments from './components/Treatments/Treatments';
import AdminLogin from './components/AdminPages/AdminLogin';
import Admin from './components/AdminPages/Admin';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const domain = 'https://heavenly-horizon-beauty-salon-and-spa.onrender.com';

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    // console.log('logged out');
  };

  return ( 
    <div className="App">
      <Router>
        < NavBar 
          isLoggedIn={isLoggedIn} //removed setIsLoggedin ....
          isAdminLoggedIn={isAdminLoggedIn}  
          handleLogout={handleLogout} />
        <div className="content">
          <Switch>
            <Route exact path="/beauty-salon-client-side" >
              <Home/>
            </Route>
            <Route exact path="/beauty-salon-client-side/about" >
              <About/>
            </Route>
            <Route exact path="/beauty-salon-client-side/login">
              <Login isLoggedIn={setIsLoggedIn} domain={domain} />
            </Route>
            <Route exact path="/beauty-salon-client-side/signup">
              <Signup isLoggedIn={setIsLoggedIn} domain={domain} />
            </Route>
            <Route exact path="/beauty-salon-client-side/passwordReset">
              <PasswordReset domain={domain}/>
            </Route>
            <Route exact path="/beauty-salon-client-side/myProfile">
              <Profile domain={domain}/>
            </Route>
            <Route exact path="/beauty-salon-client-side/treatments">
              <Treatments domain={domain}/>
            </Route>
            <Route exact path="/beauty-salon-client-side/admin">
              <Admin domain={domain}/>
            </Route>
            <Route exact path="/beauty-salon-client-side/admin/login">
              <AdminLogin isAdminLoggedIn={setIsAdminLoggedIn} domain={domain}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
   );
}
 
export default App;

