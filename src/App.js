import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home-component/Home';
import NavBar from './components/navigation-component/NavBar';
import About from './components/About';

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
          </Switch>
        </div>
      </Router>
    </div>
   );
}
 
export default App;

