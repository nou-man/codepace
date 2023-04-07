import React, { Fragment } from 'react';
import './App.css';
import Card from './components/Card'
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom"
import About from './components/About';
import Post from './components/Post';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Navbar />
      {/* <Card /> */}
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/about" element={<About />} />
        <Route path="/post" element={<Post />} />

      </Routes>
      <Footer/>
    </>
  );
}

export default App;
