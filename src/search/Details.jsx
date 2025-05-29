import React ,{useState,useEffect} from "react";
import {HashLink} from 'react-router-hash-link'
import { FaArrowUp } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from 'react-icons/fa';
import {
  GiFire,
  GiWaterDrop,
  GiGrass,
  GiElectric,
  GiSnowflake1,
  GiDragonHead,
  GiFairyWand,
  GiBoxingGlove,
  GiBirdClaw,
  GiPoisonBottle,
  GiStonePile,
  GiBugNet,
  GiGhost,
  GiSteelClaws,
  GiPsychicWaves,
  GiFangs,
  GiGroundbreaker,
  GiCancel, 
  GiPlainCircle// Import cancel icon
} from 'react-icons/gi';
const Details = () => {
 const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subloading,setSubloading]=useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [offset,setOffset]=useState(0);
  const [showid,setShowid]=useState(-1);
  const [text,setText]=useState("")
  const [store,setStore]=useState([])
  const [showpage,setShowpage]=useState(null);
  const [disable,setDisable]=useState(false);
  const [sload,setSload]=useState(false);
  const [msg,setMsg]=useState("");
  const [name,setName]=useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [pokemontype,setPokemontype]=useState([])
  const [subarray,setSubarray]=useState([])
  const [idx,setIdx]=useState(0)
  const [subdisable,setSubdisable]=useState(false)
  const [superload,setSuperload]=useState(false)
  const [allfilter,setAllfilter]=useState([])
  const types = [
    { name: 'fire', icon: <GiFire color="#FF4422" /> },
    { name: 'water', icon: <GiWaterDrop color="#3399FF" /> },
    { name: 'grass', icon: <GiGrass color="#77CC55" /> },
    { name: 'electric', icon: <GiElectric color="#FFCC33" /> },
    { name: 'psychic', icon: <GiPsychicWaves color="#FF5599" /> },
    { name: 'ice', icon: <GiSnowflake1 color="#66CCFF" /> },
    { name: 'dragon', icon: <GiDragonHead color="#7038F8" /> },
    { name: 'dark', icon: <GiFangs color="#705746" /> },
    { name: 'fairy', icon: <GiFairyWand color="#EE99AC" /> },
    { name: 'fighting', icon: <GiBoxingGlove color="#C03028" /> },
    { name: 'flying', icon: <GiBirdClaw color="#A890F0" /> },
    { name: 'poison', icon: <GiPoisonBottle color="#A040A0" /> },
    { name: 'ground', icon: <GiGroundbreaker color="#E0C068" /> },
    { name: 'rock', icon: <GiStonePile color="#B8A038" /> },
    { name: 'bug', icon: <GiBugNet color="#A8B820" /> },
    { name: 'ghost', icon: <GiGhost color="#705898" /> },
    { name: 'steel', icon: <GiSteelClaws color="#B8B8D0" /> },
    { name: 'normal', icon: <GiPlainCircle color="#A8A878" /> },
      {
      name: 'none',
      icon: <GiCancel color="#f87171" />,  // bright red color for 'none'
    }
  ];
  const API = "https://pokeapi.co/api/v2/pokemon?limit=5";
const handleSelect = (type) => {
if(type!='none'){
    setPokemontype([type])
    setIdx(0)
    setSubarray([])
    setSload(true)
    setIsOpen(false)
    setSubdisable(false)
    setSuperload(false)
    }
    else{
      setSload(false)
      setPokemontype([])
      setIsOpen(false)
      setSubdisable(false)
    setSuperload(false)
    setIdx(0)
    setSubarray([])
    }
    
  };
  const fetch_type = async (ix) => {
  try {


    const typeRes = await fetch(`https://pokeapi.co/api/v2/type/${pokemontype}`);
    if (!typeRes.ok) throw new Error("Failed to fetch type data");

    const typeData = await typeRes.json();

    // Filter Pokémon with IDs <= 1025
    const filtered = typeData.pokemon
      .map(p => p.pokemon)
      .filter(p => {
        const id = parseInt(p.url.split("/").filter(Boolean).pop());
        return id <= 1025;
      });
  
    // Slice current batch
    const currentSlice = filtered.slice(ix, ix + 10);

    // Fetch detailed data for each Pokémon
    const detailedResponses = await Promise.all(
      currentSlice.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        if (!res.ok) throw new Error(`Failed to fetch data for ${curPokemon.name}`);
        return res.json();
      })
    );

    // Append new Pokémon data
  if(ix==0){
  setTimeout(()=>{
    setSubarray([...subarray,detailedResponses])
setAllfilter(filtered)
    setSload(false);
    },1500)
    }
    else if(ix>=allfilter.length-10){
    setSubarray([...subarray,detailedResponses])
setAllfilter(filtered)
    setSload(false);
    setSubdisable(true)
    setSuperload(false)
    }
    else{
      setSubarray([...subarray,detailedResponses])
setAllfilter(filtered)
    setSload(false);
    setSubdisable(false)
    setSuperload(false)
    }
    
  } catch (err) {
    console.error("Error in fetch_type:", err);
    setError("Failed to fetch Pokémon list.");
    setSload(false);
  }
};
const gunc=()=>{
  if(idx<allfilter.length){
    setIdx(idx+10)
    setSubdisable(true)
    setSuperload(true)
    setSload(false)
  }
}
useEffect(()=>{
   if(idx!=0 && idx<allfilter.length){
    fetch_type(idx)
    }
  },[idx])
  useEffect(()=>{
   if(pokemontype.length>0){
    fetch_type(idx)
    }
  },[pokemontype])
  const fetchPokemon = async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&&limit=10`);
      const data = await res.json();
      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      const detailedResponses = await Promise.all(detailedPokemonData);
      if(offset==0){
              setPokemon([...pokemon,detailedResponses]);
    setTimeout(()=>{
      setLoading(false);
      setShowpage(true)
    },1500)
      setSubloading(false);
      setDisable(false);
      }
      else if(offset>=1015){
        setPokemon([...pokemon,detailedResponses]);
      setLoading(false);
      setSubloading(false);
      setDisable(true);
    }
    else{
      setPokemon([...pokemon,detailedResponses]);
      setLoading(false);
      setSubloading(false);
      setDisable(false);
    }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };
  useEffect(()=>{
    if(offset<1025){
    fetchPokemon()
    }
  },[offset])
  const func=()=>{
    if(offset<1025){
    setOffset(offset+10);
    setDisable(true);
    setSubloading(true);
    }
  }
  const go=(id)=>{
    setShowid(id);
    setShowpage(false);
  }
  useEffect(()=>{
   window.scrollTo({ top: 0, behavior: "smooth" });
 },[])
  var y=null
  var yi=null
  const showsh= async (name) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Pokemon not found");
    }
    const data = await response.json();
    if(data.id>1025){
      throw new Error("Pokemon not found");
    }
    setSload(true)
    setStore([data])

    
    

  } catch (error) {
   setSload(true)
    setMsg(error.message)
   
      
    
  }
  finally{
  setTimeout(()=>{
  setSload(false)
  },1200)
  }
};
const showsearch=(n)=>{
if(n.trim()!=''){
setSload(true)
setName(false)
showsh(n.trim())
  }
}



  return(<>
        {loading==true && showpage===null && <>
    <div className="w-full flex flex-col items-center justify-center gap-4 my-48">
    <img src="Home/Go.webp"  className="w-72 h-54" />
    </div>
  </>}
 {showpage===true && <>
 
     <div className="w-full h-18 flex gap-x-6 bg-sky-600">
<HashLink smooth to='/'>
  <img src="Home/5.webp" className="w-30 h-16 ml-2 mr-2 mx-1 my-1"/>
  </HashLink>
  <div className="w-full flex items-center justify-center">
    <img src="Home/Txt.webp" className="w-40 h-16" />
    </div>
  </div>
  <div className="flex justify-center gap-2 mt-4">
  <div className="relative w-72">
    <input
      type="text" value={text} disabled={sload} onChange={(e)=>{
      setText(e.target.value)
      setStore([])
      setMsg("")
      setName(true)
      }
      }
      placeholder="Search Pokemon..."
      className="w-full font-bold px-4 py-2 pr-10 border border-sky-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition disabled:bg-white"
    />
    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-500 text-xl" onClick={()=>showsearch(text)}/>
</div>
{ text.length===0 && 
<div className="p-2 bg-white rounded-md cursor-pointer transition flex items-center" onClick={() => setIsOpen(!isOpen)}>
    <FaFilter className="text-sky-500 text-xl"  />
  </div>
  }
</div>
  {
    isOpen===true && text.length==0 && 
    <>
<div className="flex justify-center mt-4">
  <ul
    className="w-52 bg-white border rounded shadow z-10 max-h-60 overflow-y-auto"
    role="listbox"
    tabIndex={-1}
  >
    {types.map(({ name, icon }) => (
      <li
        key={name}
        onClick={() => handleSelect(name)}
        className="flex items-center gap-2 px-4 py-2 cursor-pointer font-bold capitalize"
        role="option"
        tabIndex={0}
      >
        {icon}
        {name}
      </li>
    ))}
  </ul>
</div>
    </>
  }
{
  pokemontype.length>0 && text.length==0 && <>
  <div className="w-full flex flex-row flex-wrap gap-4 justify-center items-center my-2">
      {types.map(({name,icon}) => {
      if(pokemontype.includes(name))
      return (<>
      <div className="w-24 h-8 p-2 bg-white flex justify-center items-center gap-1 rounded-md">
    <h1>{icon}</h1>
    <h1 className="font-bold">{name[0].toUpperCase()+name.slice(1).toLowerCase()}</h1>
      </div>
      </>)
    })}
  </div>
  </>
}
{
  ( text.length===0) && pokemontype.length!=0 &&
 <div className="w-full flex flex-row flex-wrap justify-around my-4 gap-x-4 gap-y-4 md:flex-row md:gap-x-2 md:flex-wrap md:justify-start
 ">
     {subarray.map((item,index) => { return (
    <>
    {item.map((item)=>{
    if(item.id<1026)
    return(<>
    <HashLink smooth to={`/show?id=${item.name}&&sn=${item.id}&&abt=${item.types[0].type.name}`}>
    <div  className="mx-4 bg-white rounded-md shadow-sky-800 shadow-lg text-center hover:scale-105 font-bold hover:ease-in-out duration-300">
{ item.id<650 && <img src={item.sprites.other.dream_world.front_default}  className="h-32 w-32"/>}
{
  item.id>=650 && item.id<1026 && <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${item.id}.png`} className="h-32 w-32"/>
}
<h2 className="text-sm text-black font-bold md:text-xl ml-2 mr-2">{item.name[0].toUpperCase()+item.name.slice(1)}</h2>
    </div>
    </HashLink>
    </>)})}
    {index===subarray.length-1 &&  subdisable==false &&    <> <div className="w-full justify-center flex "> <img src="Home/5.png" style={{display:`${subdisable?"none":"block"}`}}
    className="h-8 w-8 md:mx-8 md:h-12 md:w-12 "
    onClick={gunc}/></div></>}
        {index===subarray.length-1 && superload &&
      <div  className=" text-black flex justify-center w-full font-extrabold  flex justify-center md:text-xl ">Loading...</div>
    }
    </>)})}
    </div>
}
{ ( text.length===0) && pokemontype.length==0 &&
 <div className="w-full flex flex-row flex-wrap justify-around my-4 gap-x-4 gap-y-4 md:flex-row md:gap-x-2 md:flex-wrap md:justify-start
 ">
     {pokemon.map((item,index) => { return (
    <>
    {item.map((item)=>{
    if(item.id<1026)
    return(<>
    <HashLink smooth to={`/show?id=${item.name}&&sn=${item.id}&&abt=${item.types[0].type.name}`}>
    <div  className="mx-4 bg-white rounded-md shadow-sky-800 shadow-lg text-center hover:scale-105 font-bold hover:ease-in-out duration-300">
{ item.id<650 && <img src={item.sprites.other.dream_world.front_default}  className="h-32 w-32"/>}
{
  item.id>=650 && item.id<1026 && <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${item.id}.png`} className="h-32 w-32"/>
}
<h2 className="text-sm text-black font-bold md:text-xl ml-2 mr-2">{item.name[0].toUpperCase()+item.name.slice(1)}</h2>
    </div>
    </HashLink>
    </>)})}
    {index===pokemon.length-1 &&  disable==false &&    <> <div className="w-full justify-center flex "> <img src="Home/5.png" style={{display:`${disable?"none":"block"}`}}
    className="h-8 w-8 md:mx-8 md:h-12 md:w-12 "
    onClick={func}/></div></>}
        {index===pokemon.length-1 && subloading &&
      <div  className="text-black flex justify-center w-full font-extrabold  flex justify-center md:text-xl ">Loading...</div>
    }
    </>)})}
    </div>
    }
            {
      sload===true && text.length==0 &&<>
      <div className="w-full justify-center flex "> <img src="Home/5.png" 
    className="h-14 w-14 my-32"/></div>
      </>
    }
        {
      sload===true && text.length>0 &&<>
      <div className="w-full justify-center flex "> <img src="Home/5.png" 
    className="h-14 w-14 my-48"/></div>
      </>
    }
{
 (msg!=="" && text.length!=0) && <>

        {
      sload===false && <>
      <div className="w-full justify-center flex my-48 text-center "> 
      <h1 className="text-black font-bold">
      {msg}
      </h1>
      </div>
      </>
    }
    
    
  </>
}
    {
      (store.length!=0 && text.length!=0) && <>

    { sload===false && 
       <div className="w-full flex flex-row flex-wrap justify-around my-4 gap-x-4 gap-y-4 md:flex-row md:gap-x-2 md:flex-wrap md:justify-start
 ">
     {store.map((item,index) => { return (
    <>
     <HashLink smooth to={`/show?id=${item.name}&&sn=${item.id}&&abt=${item.types[0].type.name}`}>
        <div  className="mx-4 bg-white rounded-md shadow-sky-800 shadow-lg text-center hover:scale-105 font-bold hover:ease-in-out duration-300">
  { item.id<650 && <img src={item.sprites.other.dream_world.front_default}  className="h-32 w-32"/>}
{
  item.id>=650 && item.id<1026 && <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${item.id}.png`} className="h-32 w-32"/>
}
<h2 className="text-sm text-black font-bold md:text-xl ml-2 mr-2">{item.name[0].toUpperCase()+item.name.slice(1)}</h2>
    </div>
    </HashLink>
    </>)})}
    </div>
    }
      </>
    }
    <button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="fixed bottom-6 right-6 bg-sky-500 text-white p-3 rounded-full shadow-lg hover:bg-sky-500 transition"
  aria-label="Scroll to top"
>
<FaArrowUp />
</button>
    </>}
 
  </>)
};
export default Details;