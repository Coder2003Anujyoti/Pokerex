import React ,{useState,useEffect} from "react";
import {HashLink} from 'react-router-hash-link'
import { FaArrowUp } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
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
  const API = "https://pokeapi.co/api/v2/pokemon?limit=5";

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
  },1500)
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
    <img src="Home/Go.png"  className="w-72 h-54" />
    </div>
  </>}
 {showpage===true && <>
 
     <div className="w-full h-18 flex gap-x-6 bg-sky-600">
<HashLink smooth to='/'>
  <img src="Home/5.png" className="w-30 h-16 ml-2 mr-2 mx-1 my-1"/>
  </HashLink>
  <div className="w-full flex items-center justify-center">
    <img src="Home/Txt.png" className="w-40 h-16" />
    </div>
  </div>
  <div className="flex justify-center mt-4">
  <div className="relative w-72">
    <input
      type="text" value={text} onChange={(e)=>{
      setText(e.target.value)
      setStore([])
      setMsg("")
      setName(true)
      }
      }
      placeholder="Search Pokemon..."
      className="w-full font-bold px-4 py-2 pr-10 border border-sky-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
    />
    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-500 text-xl" onClick={()=>showsearch(text)} disabled={sload}/>
</div>
</div>
{ ( text.length===0)  &&
 <div className="w-full flex flex-row flex-wrap justify-around my-4 gap-x-4 gap-y-4 md:flex-row md:gap-x-2 md:flex-wrap md:justify-start
 ">
     {pokemon.map((item,index) => { return (
    <>
    {item.map((item)=>{
    if(item.id<1026)
    return(<>
    <HashLink smooth to={`/show?id=${item.name}`}>
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
      <div  className="my-2 text-black flex justify-center w-full font-extrabold  flex justify-center md:text-xl ">Loading...</div>
    }
    </>)})}
    </div>
    }
        {
      sload===true && <>
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
     <HashLink smooth to={`/show?id=${item.name}`}>
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