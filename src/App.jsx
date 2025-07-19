import { useState,useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Details from './search/Details'
import Show from './search/Show'
import Play from './game/Play'
import Warning from './Warning'; 
const App=()=>{
 useEffect(()=>{
   document.body.className="bg-sky-400";
 })
  return(<>
  <Router>
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/details" element={<Details />} />
    <Route path="/show" element={<Show />} />
      <Route path="/play" element={
      <Warning> <Play /></Warning>
     } />
  </Routes>
  </Router>
  </>)
}

export default App