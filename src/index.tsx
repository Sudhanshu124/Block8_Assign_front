import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Pages/Login';
import Header from './Components/Header';
import Home from "./Pages/Home";
import Draw from "./Pages/Draw"
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Transactions from './Pages/transactions';
import Admin from './Pages/Admin';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>

        <Route  path="/" element={<Login />} />
        <Route  path="/home" element={<Home />} />
        <Route  path="/admin" element={<Admin />} />
        <Route  path="/draw/:userId/:ticketId" element={<Draw />} />
        <Route  path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
