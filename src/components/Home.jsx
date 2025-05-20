import React,{useState,useEffect} from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaArrowUp } from "react-icons/fa";
import {HashLink} from 'react-router-hash-link'
const Home = () => {
const [load,setLoad]=useState(true)
const get_data=async()=>{
if(load===true){
const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&&limit=100`);
      const data = await res.json();
  setTimeout(()=>{
    setLoad(false)
  },1200)
}
}
useEffect(()=>{
  get_data();
},[])
 useEffect(()=>{
   window.scrollTo({ top: 0, behavior: "smooth" });
 },[])
 let images=["A1","A2","A3","A4","A5","A6"];
  return (
  <>
      {load==true && <>
    <div className="w-full flex flex-col items-center justify-center gap-4 my-48">
    <img src="Home/Go.png"  className="w-72 h-54" />
    </div>
  </>}
  { load===false && <>
    <div className="w-full h-18 flex gap-x-6 bg-sky-600">
  <img src="Home/5.png" onClick={()=>
    window.location.reload()} className="w-30 h-16 ml-2 mr-2 mx-1 my-1"/>
  <div className="w-full flex items-center justify-center">
    <img src="Home/Txt.png" className="w-40 h-16" />
    </div>
  </div>
<div className="w-full my-1 gap-4 flex justify-center flex-col">
<div className="w-full flex justify-center">
<img src="Home/1.png" className="w-80 h-36" />
</div>
<div id="about" className="w-full flex flex-col justify-center items-center">
<div className="w-full flex flex-row flex-wrap font-bold text-xs">
<p className="ml-2 mr-2">It is an app that offers a comprehensive database of Pokémon. It allows users to easily search, explore, and learn about different Pokémon species, their abilities, evolutions, and other important details. The app features an intuitive design, making it simple for Pokémon enthusiasts to access information, track progress, and enhance their knowledge. Whether you are a casual player or a dedicated fan, It serves as an essential tool for exploring the Pokémon universe, offering real-time updates and detailed stats to keep users engaged. It’s a perfect companion for any Pokémon fan.Pokémon,abbreviated from the Japanese title of Pocket Monsters, and currently branded in English as Pokémon the Series,is a Japanese anime television series, part of The Pokémon Company Pokémon media franchise, which premiered on TV Tokyo in April 1997.The franchise originated as a pair of role-playing games developed by Game Freak, from an original concept by its founder, Satoshi Tajiri. Released on the Game Boy on February 27, 1996, the games became sleeper hits and were followed by manga series, a trading card game, and anime series and films.
</p>
</div>
</div>
</div>
<div id="services" className="w-full flex my-6 items-center flex-col justify-center gap-5">
<div className="w-full flex flex-row gap-8 flex-wrap justify-center">
<HashLink smooth to="/details">
<div className="w-30 h-30 bg-sky-600 rounded-md shadow-sky-800 shadow-md flex justify-center items-center gap-2 flex-col p-4 font-bold text-sm transition duration-300 ease-in-out text-white transform hover:scale-105 font-bold">
<img src="Home/game (2).png" className="w-30 h-24"/>
<h1>Pokemons</h1>
</div>
</HashLink>
<HashLink smooth to="/play">
<div className="w-30 h-30 bg-sky-600 rounded-md shadow-sky-800 shadow-md flex justify-center items-center gap-2 flex-col p-4 font-bold text-sm transition duration-300 ease-in-out text-white transform hover:scale-105 font-bold ">
<img src="Home/game (1).png" className="w-30 h-24"/>
<h1>Game</h1>
</div>
</HashLink>
</div>
</div>
<div id="gallery" className="w-full flex py-6 items-center flex-col justify-center gap-8">
<div className="w-full flex justify-center items-center gap-3 flex-row flex-wrap">
    <div className="flex flex-row flex-wrap">
    <img className="w-80 h-30" src={`Home/2.png`} />
    </div>
</div>
</div>
<footer className="bg-sky-700 text-white  shadow-inner py-4">
<div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
<div>
<div className="flex items-center space-x-3 flex-col mb-4">
<img src="Home/Go.png" className="w-54 h-36" alt="Angry Birds"  />
</div>
<p className="text-sm font-bold text-white">Discover the world of Pokémon where adventure never ends! From thrilling battles to legendary discoveries, there's always something new to explore. Stay connected with the community, track your journey, and catch ‘em all as you grow your app. Whether you're a seasoned trainer or just starting out, the Pokémon universe welcomes you. Let the journey continue beyond the final badge!
</p></div>
<div className="space-y-4">
<h3 className="text-lg font-semibold">Connect with Us</h3>
<div className="flex space-x-5">
<FaFacebook className=" cursor-pointer text-xl" />
<FaTwitter className=" cursor-pointer text-xl" />
<FaInstagram className="cursor-pointer text-xl" />
<FaYoutube className="cursor-pointer text-xl" />
</div>
<div className="text-sm text-white">
<a>Privacy Policy</a> ·
<a  className="ml-2 ">Terms of Service</a>
</div>
</div> </div>
<div className="text-center mt-8 p-4 text-sm text-white border-t border-sky-500 ">
<p>  © {new Date().getFullYear()} Pokemon Universe. All rights reserved.</p>
</div>
<button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-sky-500 text-white p-2 sm:p-3 rounded-full shadow-md sm:shadow-lg hover:bg-sky-600 transition-all duration-300 z-50"
  aria-label="Scroll to top"
>
  <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
</button>
</footer>
</>}
  </>
  );
};
export default Home;