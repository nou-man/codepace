import React, { Fragment } from 'react';
import './App.css';
import Card from './components/Card'
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom"
import About from './components/About';

function App() {

  return (
    <>
      <Navbar />
      {/* <Card /> */}
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </>
  );
}

export default App;
