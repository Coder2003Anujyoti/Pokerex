import React,{useState,useEffect} from "react"
import { FaArrowUp } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'
import Button from '@mui/material/Button';
import { FaArrowLeft } from 'react-icons/fa'; 
import {HashLink} from 'react-router-hash-link'
const Show = () => {
const [evolutions, setEvolutions] = useState([]);
const [weak,setWeak]=useState([])
const [load,setLoad]=useState(true)
const [name,setName]=useState(null)
const [number,setNumber]=useState(null)
const [searchdata,setSearchdata]=useState([])
const [description,setDescription]=useState("")
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const ident=queryParams.get('sn');
  const abt=queryParams.get('abt');
const get_pokemon=async()=>{
  const [res,desc,typeRes] = await Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${id.toLowerCase()}`),fetch(`https://pokeapi.co/api/v2/pokemon-species/${ident}`),fetch(`https://pokeapi.co/api/v2/type/${abt}`)]);
const data = await res.json();
const speciesDesc = await desc.json();
const damageRelations= await typeRes.json();
const weaknessesSet = new Set();
damageRelations.damage_relations.double_damage_from.forEach(dmgType => {
  weaknessesSet.add(dmgType.name);
});

  const weaknesses = Array.from(weaknessesSet).slice(0,1);
  const flavorEntry = speciesDesc.flavor_text_entries.find(
    entry => entry.language.name === 'en'
  );
  const descn = flavorEntry ? flavorEntry.flavor_text.replace(/\n|\f/g, ' ') : 'No description available.';
  
  
  
  
const speciesRes= await fetch(data.species.url);
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

// Fetch IDs of all evolution species
const familyWithIds = await Promise.all(
  family.map(async (name) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const json = await res.json();
    return { name, id: json.id };
  })
);
const u=familyWithIds.filter((i)=>i.name!=data.name)

setEvolutions(u); // [{ name: 'rockruff', id: 744 }, { name: 'lycanroc', id: 745 }]

setTimeout(() => {
  setSearchdata([data]);
  setWeak([weaknesses])
  setDescription(descn)
  setNumber(data.id);
  setName(data.name);
  setLoad(false);
},1200);
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
    <div className="w-full flex flex-col items-center justify-center gap-4 my-56">
    <img src="Home/Go.webp"  className="w-72 h-54 lg:w-96 lg:h-60" />
    </div>
  </>}
  { load==false && <>
       <div className="w-full h-18 flex md:hidden gap-x-6 bg-sky-600">
  <HashLink smooth to='/'>
  <img src="Home/5.webp" className="w-30 h-16 ml-2 mr-2 mx-1 my-1"/>
  </HashLink>
  <div className="w-full flex items-center justify-center">
    <img src="Home/Txt.webp" className="w-40 h-16" />
    </div>
  </div>
   <nav className="bg-sky-600 hidden md:block text-white backdrop-blur-md shadow-md">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
      <div className="flex items-center space-x-2">
        <HashLink smooth to='/'>
          <img
          src="Home/5.webp"
          alt="Logo"
          className="w-20 h-16 md:w-24 md:h-20 lg:w-28 lg:h-24 object-contain"
        />
        </HashLink>
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
  <div className="w-full flex flex-column flex-wrap justify-around my-4"> {searchdata.map((i,ind)=>{
         return(
         <>
 <div className="flex flex-col my-6 justify-center md:hidden">
 <div className="w-full flex gap-4 flex-row flex-wrap justify-center items-center">
<div className="rounded-lg bg-white shadow-lg shadow-sky-700 w-40 h-40 font-bold hover:scale-105 font-bold hover:ease-in-out duration-300">
{ i.id<650 && <img src={i.sprites.other.dream_world.front_default}  className="h-40 w-40"/>}
{
  (i.id>=650 && i.id<1026) && <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${i.id}.png`} className="h-40 w-40"/>
}
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
Weakness-: {weak}
          </p></div>
          </div>
{ description!='No description available.' &&
  <div className="flex flex-col text-black font-bold text-lg gap-y-1 items-center justify-center">
   <button className="pl-6 pr-6 px-2 py-2 w-72 flex justify-center items-center bg-sky-700 text-white text-base rounded-md font-bold">{description}</button>
  </div>
  }
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
    { evolutions.filter((i)=>i.name!=name).length>0 && <>
        <div className="w-full flex flex-col gap-2 text-center justify-center items-center my-3 text-black text-lg font-bold">
        <h1>Evolutionary Species</h1>
         <div className="w-full flex flex-row flex-wrap my-4 justify-center items-center gap-4 text-center">{
        evolutions.map((i)=>{
        if(i.name!=name)
          return(<>

          <div className="bg-white shadow-lg shadow-sky-700 w-40 flex justify-center flex-col items-center h-40 font-bold rounded-lg hover:scale-105 font-bold hover:ease-in-out duration-300 text-sm">
<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i.id}.png`} className="w-32 h-32" />
          <h1>{i.name[0].toUpperCase()+i.name.slice(1).toLowerCase()}</h1>
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
<div className="w-full flex-col gap-10 my-4 hidden md:flex">
  {searchdata.map((i, ind) => (
    <div
      key={i.id}
      className="w-full flex flex-col gap-4 items-center md:flex-row md:items-start rounded-xl p-4"
    >
      {/* 🖼️ Image section + Evolution */}
      <div className="flex flex-col items-center gap-4 md:w-1/2">
        <div className="flex flex-wrap justify-center gap-4">
          {/* DreamWorld or Shiny */}
          <div className="rounded-xl bg-white w-40 h-40 md:w-48 md:h-48 flex justify-center items-center hover:scale-105 transition-transform duration-300">
            {i.id < 650 ? (
              <img
                src={i.sprites.other.dream_world.front_default}
                className="w-full h-full object-contain"
              />
            ) : (
              i.id < 1026 && (
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${i.id}.png`}
                  className="w-full h-full object-contain"
                />
              )
            )}
          </div>
          {/* Official artwork */}
          <div className="rounded-xl bg-white w-40 h-40 lg:w-48 lg:h-48 lg:flex md:hidden justify-center items-center hover:scale-105 transition-transform duration-300">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i.id}.png`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 🧬 Evolution section moved below main images */}
      {evolutions.filter(e => e.name !== i.name).length > 0 && (
  <div className="w-full mt-4 text-black">
    <h2 className="text-center text-lg font-bold mb-2">Evolutionary Species</h2>
    
    <div className="flex flex-wrap gap-4 justify-center">
      {evolutions
        .filter(evo => evo.name !== i.name)
        .map(evo => (
          <div
            key={evo.id}
            className="bg-white shadow-md shadow-sky-700 rounded-lg w-32 h-40 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.id}.png`}
              className="w-24 h-24 object-contain"
            />
            <p className="mt-1 text-sm font-bold">
              {evo.name[0].toUpperCase() + evo.name.slice(1)}
            </p>
          </div>
        ))}
    </div>
  </div>
)}

      </div>

      {/* ℹ️ Info section */}
      <div className="flex flex-col md:w-1/2 gap-4 text-black font-bold">
        <div className="flex justify-center md:justify-start">
          <button className="bg-sky-700 text-white px-4 py-1 rounded-md font-bold">
            #{i.id}
          </button>
        </div>

        <p className="text-lg font-bold">Name: {i.name[0].toUpperCase() + i.name.slice(1)}</p>
        <p className="text-lg font-bold">Type: {i.types.map(t => t.type.name).join(', ')}</p>
        <p className="text-lg font-bold">Ability: {i.abilities.slice(0, 1).map(a => a.ability.name)}</p>
        <p className="text-lg font-bold">Weakness: {weak}</p>

        {/* Reduced description width */}
        {description !== 'No description available.' && (
          <p className="bg-sky-700 text-white px-4 py-2 rounded-md font-semibold text-sm max-w-md">
            {description}
          </p>
        )}

        {/* 📊 Stats */}
        <div className="flex flex-wrap gap-24 mt-2">
          <div className="space-y-1">
            <p>Height: {i.height}</p>
            <p>Weight: {i.weight}</p>
            <p>Experience: {i.base_experience}</p>
          </div>
          <div className="space-y-1">
            <p>Attack: {i.stats[1].base_stat}</p>
            <p>Defense: {i.stats[2].base_stat}</p>
            <p>Speed: {i.stats[5].base_stat}</p>
            <p>HP: {i.stats[0].base_stat}</p>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


<footer className="bg-sky-700 text-white  shadow-inner py-4 md:hidden">
<div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
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
  className="fixed bottom-6 right-6 bg-sky-600 text-white p-3 rounded-full shadow-lg transition"
  aria-label="Scroll to top"
>
<FaArrowUp />
</button>
</footer>
<HashLink smooth to="/details">
<button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="fixed left-6 bottom-6 bg-sky-600 hidden md:block text-white p-3 rounded-full shadow-lg  transition"
  aria-label="Scroll to top"
>
<FaArrowLeft />
</button>
</HashLink>
   </>
   }
    </>
  );
}
export default Show;