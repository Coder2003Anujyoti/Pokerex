import React,{useState,useEffect} from "react"
import { FaArrowUp } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'
import Button from '@mui/material/Button';
import {HashLink} from 'react-router-hash-link'
const Show = () => {
const [evolutions, setEvolutions] = useState([]);
const [load,setLoad]=useState(true)
const [name,setName]=useState(null)
const [number,setNumber]=useState(null)
const [searchdata,setSearchdata]=useState([])
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
const get_pokemon=async()=>{
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id.toLowerCase()}`);
  const data=await res.json();
  const speciesRes = await fetch(data.species.url);
 const speciesData = await speciesRes.json();
const evolutionRes = await fetch(speciesData.evolution_chain.url);
const evolutionData = await evolutionRes.json();
 const getEvolutions = (chain) => {
          const evoList = [];
          let current = chain;
          while (current) {
            evoList.push(current.species.name);
            current = current.evolves_to[0];
          }
          return evoList;
        };
        const family = getEvolutions(evolutionData.chain);
        setEvolutions(family);
  setTimeout(()=>{
   setSearchdata([data])
   setNumber(data.id)
   setName(data.name)
    setLoad(false)
  },2000)
}
useEffect(()=>{
   window.scrollTo({ top: 0, behavior: "smooth" });
 },[id])
 useEffect(()=>{
  setLoad(true)
   get_pokemon()
 },[id])
  

  
  return (
    <>
            {load==true && <>
    <div className="w-full flex flex-col items-center justify-center gap-4 my-48">
    <img src="Home/Go.png"  className="w-72 h-54" />
    </div>
  </>}
  { load==false && <>
       <div className="w-full h-18 flex gap-x-6 bg-sky-600">
  <HashLink smooth to='/'>
  <img src="Home/5.png" className="w-30 h-16 ml-2 mr-2 mx-1 my-1"/>
  </HashLink>
  <div className="w-full flex items-center justify-center">
    <img src="Home/Txt.png" className="w-40 h-16" />
    </div>
  </div>
  <div className="w-full flex flex-column flex-wrap justify-around my-4"> {searchdata.map((i,ind)=>{
         return(
         <>
 <div className="flex flex-col my-6 justify-center md:gap-x-8  md:justify-evenly lg:flex-row">
 <div className="w-full flex gap-4 flex-row flex-wrap justify-center items-center">
<div className="rounded-lg bg-white shadow-lg shadow-sky-700 w-40 h-40 font-bold hover:scale-105 font-bold hover:ease-in-out duration-300">
<img src={i.sprites.other.dream_world.front_default}  className="h-40 w-40"/>
</div>
 <div className="rounded-lg bg-white shadow-lg shadow-sky-700  font-bold w-40 h-40 hover:scale-105 font-bold hover:ease-in-out duration-300">
<img src={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i.id}.png`} className="w-40 h-40"/> 
</div>
</div>
<div className="my-12 text-black">
<div className="flex justify-center items-center">
 <button className="pl-6 pr-6 px-2 py-2 flex justify-center items-center bg-sky-700 text-white rounded-md font-bold">#{i.id}</button>
</div>
<div className="  flex flex-col justify-center text-lg font-bold my-2">
 <div className="w-full flex justify-center"><p className="text-lg font-bold  md:text-lg">Name-: {i.name[0].toUpperCase()+i.name.slice(1)}</p></div>
 <div className="w-full flex justify-center text-lg font-bold"> <p className="pokemon-info-type">
    Type-: {i.types.map((curType) => curType.type.name).join(", ")}
      </p></div>
     <div className="w-full flex justify-center text-lg font-bold">  <p className="pokemon-info-abilities">
          Ability-: {i.abilities
              .map((abilityInfo) => abilityInfo.ability.name)
              .slice(0,1)
              .join(", ")}
          </p></div>
               <div className="w-full flex justify-center text-lg font-bold">  <p className="pokemon-info-abilities">

          </p></div>
          </div>
    <div className="flex w-full flex-row flex-wrap gap-x-8">
      <div className="p-4 ml-2 flex flex-col text-lg  font-bold justify-center">
       <div> <p className="pokemon-info-one">
          <span> Height:</span> {i.height}
        </p></div>
       <div> <p className="pokemon-info-two">
          <span> Weight:</span> {i.weight}
        </p></div>
        <div><p className="pokemon-info-three">
          <span> Experience:</span> {i.base_experience}
        </p></div>
        </div>
     <div className="p-4 mr-2 flex flex-col text-lg font-bold justify-center">
          <p className="pokemon-info-four">
          <span> Attack: </span> {i.stats[1].base_stat}
        </p>
      <p className="pokemon-info-five">
          <span> Defense: </span> {i.stats[2].base_stat}
        </p>
       <p className="pokemon-info-six">
          <span> Speed: </span> {i.stats[5].base_stat}
        </p>
      <p className="pokemon-info-six">
          <span> HP: </span> {i.stats[0].base_stat}
        </p>
        </div>
        </div>
    { evolutions.filter((i)=>i!=name).length>0 && <>
        <div className="w-full flex flex-col gap-2 text-center justify-center items-center my-3 text-black text-lg font-bold">
        <h1>Evolutionary Species</h1>
         <div className="w-full flex flex-row flex-wrap my-4 justify-center items-center gap-4 text-center">{
        evolutions.map((i)=>{
        if(i!=name)
          return(<>

          <div className="bg-white shadow-lg shadow-sky-700 w-40 flex justify-center flex-col items-center h-40 font-bold rounded-lg hover:scale-105 font-bold hover:ease-in-out duration-300 text-sm">
<img src={`https://img.pokemondb.net/artwork/large/${i}.jpg`} className="w-32 h-32" />
          <h1>{i[0].toUpperCase()+i.slice(1).toLowerCase()}</h1>
          </div>
          </>)
        })
      }
       </div>
    </div>
    </>
    }
    </div>
    </div>
         </>
         )
       })
       }
</div>
<footer className="bg-sky-700 text-white  shadow-inner py-4">
<div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
<div>
<div className="flex items-center space-x-3 flex-col mb-4">
<img src="Home/Go.png" className="w-54 h-36" alt="Angry Birds"  />
</div>
<p className="text-sm font-bold text-white">Discover the world of Pokémon where adventure never ends! From thrilling battles to legendary discoveries, there's always something new to explore. Stay connected with the community, track your journey, and catch ‘em all as you grow your Pokédex. Whether you're a seasoned trainer or just starting out, the Pokémon universe welcomes you. Let the journey continue beyond the final badge!
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
  className="fixed bottom-6 right-6 bg-sky-500 text-white p-3 rounded-full shadow-lg hover:bg-sky-500 transition"
  aria-label="Scroll to top"
>
<FaArrowUp />
</button>
</footer>
   </>
   }
    </>
  );
}
export default Show;