import React from "react";
import {DataProvider} from "./GlobalState"
import {BrowserRouter as Router} from "react-router-dom"
import Header from "./components/headers/Header";
import MainPages from "./components/MainPages/Pages"


function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
        <Header />
       <MainPages />
        </div>
        </Router>
    </DataProvider>
    
  ); 
}

export default App;
