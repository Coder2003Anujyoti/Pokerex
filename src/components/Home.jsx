import React,{useState,useEffect} from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn,FaFacebookF } from 'react-icons/fa';
import { FaArrowUp } from "react-icons/fa";
import {HashLink} from 'react-router-hash-link'
const Home = () => {
const [load,setLoad]=useState(true)
const [pokemon, setPokemon] = useState([]);
const get_data=async()=>{
if(load===true){
const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&&limit=20`);
      const data = await res.json();
       const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      const detailedResponses = await Promise.all(detailedPokemonData);
  setTimeout(()=>{
    setPokemon([...pokemon,detailedResponses]);
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
    <div className="w-full flex flex-col items-center justify-center gap-4 my-56">
    <img src="Home/Go.webp"  className="w-72 h-54 lg:w-96 lg:h-60" />
    </div>
  </>}
  { load===false && <>
  {/* //*Navbar for mobile */}
    <div className="w-full h-18 flex gap-x-6 bg-sky-600 md:hidden">
  <img src="Home/5.webp" onClick={()=>
    window.location.reload()} className="w-14 h-16 ml-2 mr-2 mx-1 my-1"/>
  <div className="w-full flex items-center justify-center">
    <img src="Home/Txt.webp" className="w-40 h-16" />
    </div>
  </div>
   {/* //*Navbar for laptop and tablets  */}
   <nav className="bg-sky-600 hidden md:block text-white backdrop-blur-md shadow-md">
  <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
    <div className="flex items-center space-x-2">
      <img
        src="Home/5.webp"
        alt="Logo"
        onClick={() => window.location.reload()}
        className="w-20 h-16 md:w-24 md:h-20 lg:w-28 lg:h-24 object-contain"
      />
    </div>
    <div className="flex items-center justify-center">
      <img
        src="Home/Txt.webp"
        alt="Brand Text"
        className="w-52 h-14 md:w-72 md:h-20 lg:w-96 lg:h-24 object-contain"
      />
    </div>
  </div>
</nav>
{/* //*Text section for laptop and tablet */}
<div className="w-full bg-sky-500 hidden md:flex flex-col lg:flex-row items-center justify-between p-6 gap-10">
  <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
    <p className="font-bold text-white text-3xl md:text-4xl lg:text-6xl">Welcome to Pokerex</p>
    <span className="font-semibold text-white text-lg md:text-xl lg:text-3xl">
       Enter the world of Pokémon — start your search and discover them all!
    </span>
    <p className="font-medium text-slate-100 text-sm md:text-base">
      It is an app that offers a comprehensive database of Pokémon.  
  Users can easily search, explore, and learn about different Pokémon species, their abilities, evolutions, and other important details.  
  Whether you're a seasoned trainer or a curious newcomer, this app helps you dive deep into the Pokémon universe.  
  From stats and moves to evolution chains and type advantages, everything you need is just a tap away.  
  Stay updated, build your perfect team, and become the ultimate Pokémon Master!</p>
  <HashLink smooth to="/details" className="hidden md:flex">
  <div className="bg-gradient-to-br from-sky-600 to-blue-700 rounded-lg shadow-md hover:shadow-lg 
  flex items-center gap-3 px-4 py-2 text-white transition-transform duration-300 transform hover:scale-105">
    <img
      src="Home/game (2).png"
      alt="Pokémons"
      className="w-10 h-10 object-contain"
    />
    <h1 className="text-sm md:text-base lg:text-lg font-semibold tracking-wide">
      Explore Pokémons
    </h1>
  </div>
</HashLink>
  </div>
  <div className="w-full lg:w-1/2 flex justify-center">
    <img
      src="Home/1.webp"
      alt="Shopping"
      className="max-w-full h-auto rounded-xl "
    />
  </div>
</div>
{/* //*Text section for mobile */}
<div className="w-full my-1 gap-4 flex justify-center flex-col md:hidden">
<div className="w-full flex justify-center">
<img src="Home/1.webp" className="w-80 h-36" />
</div>
<div id="about" className="w-full flex flex-col justify-center items-center">
<div className="w-full flex flex-row flex-wrap font-bold text-xs">
<p className="ml-4 mr-4">It is an app that offers a comprehensive database of Pokémon. It allows users to easily search, explore, and learn about different Pokémon species, their abilities, evolutions, and other important details. The app features an intuitive design, making it simple for Pokémon enthusiasts to access information, track progress, and enhance their knowledge. Whether you are a casual player or a dedicated fan, It serves as an essential tool for exploring the Pokémon universe, offering real-time updates and detailed stats to keep users engaged. It’s a perfect companion for any Pokémon fan.Pokémon,abbreviated from the Japanese title of Pocket Monsters, and currently branded in English as Pokémon the Series,is a Japanese anime television series, part of The Pokémon Company Pokémon media franchise, which premiered on TV Tokyo in April 1997.The franchise originated as a pair of role-playing games developed by Game Freak, from an original concept by its founder, Satoshi Tajiri. Released on the Game Boy on February 27, 1996, the games became sleeper hits and were followed by manga series, a trading card game, and anime series and films.
</p>
</div>
</div>
</div>
{/* //*Service section for mobile */}
<div id="services" className="w-full flex my-6 items-center flex-col justify-center gap-5 md:hidden">
<div className="w-full flex flex-row gap-8 flex-wrap justify-center">
<HashLink smooth to="/details">
<div className="w-30 h-30 bg-sky-600 rounded-md shadow-sky-800 shadow-md flex justify-center items-center gap-2 flex-col p-4 font-bold text-sm transition duration-300 ease-in-out text-white transform hover:scale-105 font-bold">
<img src="Home/game (2).png" className="w-30 h-24"/>
<h1>Pokemons</h1>
</div>
</HashLink>
<HashLink smooth to="/play">
<div className="w-30 h-30 bg-sky-600 rounded-md shadow-sky-800 shadow-md flex md:hidden justify-center items-center gap-2 flex-col p-4 font-bold text-sm transition duration-300 ease-in-out text-white transform hover:scale-105 font-bold ">
<img src="Home/game (1).png" className="w-30 h-24"/>
<h1>Game</h1>
</div>
</HashLink>
</div>
</div>
<div id="gallery" className="w-full flex py-6 items-center flex-col justify-center gap-8 md:hidden">
<div className="w-full flex justify-center items-center gap-3 flex-row flex-wrap">
    <div className="flex flex-row flex-wrap">
    <img className="w-80 h-30" src={`Home/2.webp`} />
    </div>
</div>
</div>
{/* //*Service section for laptop tablets */}
<div className="w-full hidden md:block min-h-[30rem]  mb-0 relative overflow-hidden">
  <img
    src="Home/2.webp"
    alt="Background"
    className="absolute inset-0 w-full h-full blur-sm object-cover"
  />
  <div className="relative z-10 w-full h-full bg-black/50 flex flex-col items-center text-center px-6 py-12">
    <h2 className="text-white text-4xl lg:text-5xl font-extrabold mb-6 drop-shadow-md">
      About <span className="text-yellow-400">Pokerex</span>
    </h2>
    <p className="text-slate-200 text-base lg:text-lg font-medium max-w-5xl leading-relaxed drop-shadow-sm">
     It is an app that offers a comprehensive database of Pokémon. It allows users to easily search, explore, and learn about different Pokémon species, their abilities, evolutions, and other important details. The app features an intuitive design, making it simple for Pokémon enthusiasts to access information, track progress, and enhance their knowledge. Whether you are a casual player or a dedicated fan, It serves as an essential tool for exploring the Pokémon universe, offering real-time updates and detailed stats to keep users engaged. It’s a perfect companion for any Pokémon fan.Pokémon,abbreviated from the Japanese title of Pocket Monsters, and currently branded in English as Pokémon the Series,is a Japanese anime television series, part of The Pokémon Company Pokémon media franchise, which premiered on TV Tokyo in April 1997.The franchise originated as a pair of role-playing games developed by Game Freak, from an original concept by its founder, Satoshi Tajiri. Released on the Game Boy on February 27, 1996, the games became sleeper hits and were followed by manga series, a trading card game, and anime series and films.
</p>
  </div>
<div className="relative z-10 w-full flex justify-center bg-black/50 px-4 py-8">
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {pokemon.map((itemList) =>
      itemList.map((item) => {
        if (item.id < 1026) {
          return (
           <div
  key={item.id}
  className="relative overflow-hidden bg-white shadow-md rounded-xl p-4 w-64 sm:w-72 md:w-60 hover:scale-105 transition-transform duration-300 ease-in-out"
>
  <figure className="flex justify-center mb-3 drop-shadow-md">
    {item.id < 650 ? (
      <img
        src={item.sprites?.other?.dream_world?.front_default}
        alt={item.name}
        className="w-3/5 h-24 object-contain"
      />
    ) : item.id < 1026 ? (
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${item.id}.png`}
        alt={item.name}
        className="w-3/5 h-24 object-contain"
      />
    ) : (
      <span className="text-xs text-gray-500">Image unavailable</span>
    )}
  </figure>
<h1 className="text-center text-xl font-bold capitalize text-gray-800 tracking-wide drop-shadow-sm hover:scale-105 transition-transform duration-300">
  {item.name}
</h1>
</div>

          );
        }
        return null;
      })
    )}
  </ul>
</div>
</div>
{/* //*Footer for mobile */}
<footer className="bg-sky-700 text-white md:hidden  shadow-inner py-4">
<div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
<div>
<div className="flex items-center space-x-3 flex-col mb-4">
<img src="Home/Go.webp" className="w-54 h-36" alt="Angry Birds"  />
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
{/* //*Footer for pc and laptop */}
 <footer className="bg-sky-700 text-white py-12 hidden md:block">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 px-6">
    
    {/* Brand Image + Tagline */}
    <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
      <img
        src="Home/Go.webp"
        alt="ShopEase Logo"
        className="w-40 h-40 sm:w-52 sm:h-52 lg:w-72 lg:h-72 object-contain rounded-lg"
      />
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ml-6">Pokerex</h2>
        <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-md ml-6">Pokerex is your one-stop destination for the latest trends, accurate data, and a smooth, fun-filled experience.
        </p>
      </div>
    </div>

    {/* Social Icons */}
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
      <div className="p-3 sm:p-4 bg-sky-600 rounded-full hover:bg-sky-500 transition">
        <FaFacebookF className="text-2xl sm:text-3xl" />
      </div>
      <div className="p-3 sm:p-4 bg-sky-600 rounded-full hover:bg-sky-500 transition">
        <FaTwitter className="text-2xl sm:text-3xl" />
      </div>
      <div className="p-3 sm:p-4 bg-sky-600 rounded-full hover:bg-sky-500 transition">
        <FaInstagram className="text-2xl sm:text-3xl" />
      </div>
      <div className="p-3 sm:p-4 bg-sky-600 rounded-full hover:bg-sky-500 transition">
        <FaLinkedinIn className="text-2xl sm:text-3xl" />
      </div>
      <div className="p-3 sm:p-4 bg-sky-600 rounded-full hover:bg-sky-500 transition">
        <FaYoutube className="text-2xl sm:text-3xl" />
      </div>
    </div>
  </div>

  {/* Copyright */}
  <div className="mt-10 text-center text-xs sm:text-sm md:text-base text-gray-300 px-4">
    © {new Date().getFullYear()} Pokemon Universe. All rights reserved.
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