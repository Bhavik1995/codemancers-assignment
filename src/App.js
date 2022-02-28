import React from "react";

// import "./App.css";
import SendData from "./SendData";
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Posts from "./Posts";

const App = () =>{

return(
  <>
     <div>
      <Router>
          <Routes>  
              <Route path="/" element={<SendData/>}/>
              <Route path = "/posts" element={<Posts/>}/>
          </Routes>
      </Router>
    </div>
  </>
)
}

export default App;
