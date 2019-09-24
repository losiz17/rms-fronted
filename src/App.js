import React from "react";
// import logo from './logo.svg';
import "./App.css";

import { BrowserRouter, Route, Link } from "react-router-dom";

import Header from "./components/header.jsx";
import Search from "./components/search.jsx";
import Register from "./components/register.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div>
          <Route exact path="/" component={Search} />
          <Route path="/search" component={Search} />
          <Route path="/register" component={Register} />
        </div>

        <header className="App-header"></header>
      </div>
    </BrowserRouter>
  );
}

export default App;
