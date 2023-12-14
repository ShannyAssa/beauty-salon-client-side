import React, { useEffect, useState } from 'react';

const App = () => {
    const [backendData, setBackendData] = useState([{}]);

    useEffect(()=> {
      fetch("/api").then(
        response => response.json())
        .then(
          data => {
            setBackendData(data);
            console.log(data);
          }
        )
    }, []);


  return ( 
    <div className="App">

    </div>
   );
}
 
export default App;

