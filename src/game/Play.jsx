import React,{useState,useEffect} from "react";
import { FaArrowUp } from "react-icons/fa";
import {HashLink} from 'react-router-hash-link'
const Play=()=>{
  const [resp,setResp]=useState([])
  const [resc,setResc]=useState([])
  const [load,setLoad]=useState(true)
  const [points,setPoints]=useState([])
  const [player,setPlayer]=useState([])
  const [pchose,setPchose]=useState([])
  const [cchose,setCchose]=useState([])
  const [toggle,setToggle]=useState(false)
  const [mode,setMode]=useState("")
  const [cstat,setCstat]=useState("")
  const [pmode,setPmode]=useState(0)
  const [cmode,setCmode]=useState(0)
  const [ppoint,setPpoint]=useState(0)
  const [cpoint,setCpoint]=useState(0)
  const [starts,setStarts]=useState(false)
  const modes=["Attack","Defence","Speed","HP"]
const get_data=async(k)=>{
if(load===true){
const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${k}&&limit=12`);
      const data = await res.json();
      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      const detailedResponses = await Promise.all(detailedPokemonData);
      setPoints(detailedResponses)
  setTimeout(()=>{
    setLoad(false)
  },1200)
}
}
useEffect(()=>{
const rand=Math.floor(Math.random()*638)
  get_data(rand);
},[])
 useEffect(()=>{
   window.scrollTo({ top: 0, behavior: "smooth" });
 },[])
 const select=(i)=>{
 const k=points.filter((it)=> it.id!=i.id)
 if(player.length<5){
   setPoints(k)
   setPlayer([...player,i])
   }
   else{
     setPoints(k)
   setPlayer([...player,i])
   setResp([...player,i])
   setResc(k)
   setStarts(true)
   }
 }
 const start=(i)=>{
   const k=Math.floor(Math.random()*points.length);
   const u=player.filter((it)=>it.id!=i.id)
   const v=points.filter((it)=> it.id!=points[k].id)
   setPchose([i])
   setCchose([points[k]])
   setPlayer(u)
   setPoints(v)
   setToggle(true)
   setMode("")
   setCstat("")
 }
 const decide=(i)=>{
 const arr=[1,2,5,0]
 const k=arr[Math.floor(Math.random()*4)];
 const val=modes[arr.indexOf(k)]
   if(i=="Attack"){
     if(pchose[0].stats[1].base_stat>cchose[0].stats[k].base_stat){
       setPpoint(ppoint+1)
       setCpoint(cpoint)
       setToggle(false)
       setMode(i)
       setCstat(val)
       setCmode(cchose[0].stats[k].base_stat)
       setPmode(pchose[0].stats[1].base_stat)
     }
    if(pchose[0].stats[1].base_stat<cchose[0].stats[k].base_stat){
       setPpoint(ppoint)
       setCpoint(cpoint+1)
       setToggle(false)
       setMode(i)
       setCstat(val)
      setCmode(cchose[0].stats[k].base_stat)
       setPmode(pchose[0].stats[1].base_stat)
     }
        if(pchose[0].stats[1].base_stat === cchose[0].stats[k].base_stat){
       setPpoint(ppoint)
       setCpoint(cpoint)
       setToggle(false)
       setMode(i)
       setCstat(val)
      setCmode(cchose[0].stats[k].base_stat)
       setPmode(pchose[0].stats[1].base_stat)
     }
   }
      if(i=="Defence"){
     if(pchose[0].stats[2].base_stat>cchose[0].stats[k].base_stat){
       setPpoint(ppoint+1)
       setCpoint(cpoint)
       setToggle(false)
       setMode(i)
       setCstat(val)
       setCmode(cchose[0].stats[k].base_stat)
       setPmode(pchose[0].stats[2].base_stat)
     }
    if(pchose[0].stats[2].base_stat<cchose[0].stats[k].base_stat){
       setPpoint(ppoint)
       setCpoint(cpoint+1)
       setToggle(false)
       setMode(i)
       setCstat(val)
      setCmode(cchose[0].stats[k].base_stat)
       setPmode(pchose[0].stats[2].base_stat)
     }
        if(pchose[0].stats[2].base_stat === cchose[0].stats[k].base_stat){
       setPpoint(ppoint)
       setCpoint(cpoint)
       setToggle(false)
       setMode(i)
       setCstat(val)
      setCmode(cchose[0].stats[k].base_stat)
       setPmode(pchose[0].stats[2].base_stat)
     }
   }
      if(i=="Speed"){
  if(pchose[0].stats[5].base_stat>cchose[0].stats[k].base_stat){
       setPpoint(ppoint+1)
       setCpoint(cpoint)
       setToggle(false)
       setMode(i)
       setCstat(val)
       setCmode(cchose[0].stats[k].base_stat)
       setPmode(pchose[0].stats[5].base_stat)
     }
    if(pchose[0].stats[5].base_stat<cchose[0].stats[k].base_stat){
       setPpoint(ppoint)
       setCpoint(cpoint+1)
       setToggle(false)
       setMode(i)
       setCstat(val)
      setCmode(cchose[0].stats[k].base_stat)
       setPmode(pchose[0].stats[5].base_stat)
     }
        if(pchose[0].stats[5].base_stat === cchose[0].stats[k].base_stat){
       setPpoint(ppoint)
       setCpoint(cpoint)
       setToggle(false)
       setMode(i)
       setCstat(val)
      setCmode(cchose[0].stats[k].base_stat)
       setPmode(pchose[0].stats[5].base_stat)
     }
   }
         if(i=="HP"){
  if(pchose[0].stats[0].base_stat>cchose[0].stats[k].base_stat){
       setPpoint(ppoint+1)
       setCpoint(cpoint)
       setToggle(false)
       setMode(i)
       setCstat(val)
       setCmode(cchose[0].stats[k].base_stat)
       setPmode(pchose[0].stats[0].base_stat)
     }
    if(pchose[0].stats[0].base_stat<cchose[0].stats[k].base_stat){
       setPpoint(ppoint)
       setCpoint(cpoint+1)
       setToggle(false)
       setMode(i)
       setCstat(val)
      setCmode(cchose[0].stats[k].base_stat)
       setPmode(pchose[0].stats[0].base_stat)
     }
        if(pchose[0].stats[0].base_stat === cchose[0].stats[k].base_stat){
       setPpoint(ppoint)
       setCpoint(cpoint)
       setToggle(false)
       setMode(i)
       setCstat(val)
      setCmode(cchose[0].stats[k].base_stat)
       setPmode(pchose[0].stats[0].base_stat)
     }
   }
 }
 return(<>
       {load==true && <>
    <div className="w-full flex flex-col items-center justify-center gap-4 my-48">
    <img src="Home/Go.webp"  className="w-72 h-54" />
    </div>
  </>}
  { load===false && <>
    <div className="w-full h-18 flex gap-x-6 bg-sky-600">
<HashLink smooth to='/'>
  <img src="Home/5.webp"  className="w-30 h-16 ml-2 mr-2 mx-1 my-1"/>
</HashLink>
  <div className="w-full flex items-center justify-center">
    <img src="Home/Txt.webp" className="w-40 h-16" />
    </div>
  </div>
  <div className="w-full flex items-center text-center flex-col gap-4 justify-center">
<img src="Home/1.webp" className="w-80 h-36" />
{ starts===false && 
<div className="my-10 flex flex-col gap-4">
<h1 className="font-bold text-base">Select any 6 Pokemons</h1>
<div className="w-full my-2 flex flex-row flex-wrap justify-center gap-y-4 gap-x-6">
{
  points.map((i)=>{
    return(<>
  <img src={i.sprites.other.dream_world.front_default} onClick={()=>select(i)}  className="h-16 w-16"/>
    </>)
  })
}
</div>
</div>
}
{
  starts===true && <>
  <div className="w-full flex flex-row flex-wrap justify-center items-center gap-24">
  <div className="flex flex-col ml-2 items-center justify-center gap-6 text-base font-bold">
  <h1 className="font-bold text-base">Player</h1>
  <div className="flex flex-col items-center justify-center gap-2 text-base font-bold">
  { pchose.length>0 && <>
  <img src={pchose[0].sprites.other.dream_world.front_default} className="w-24 h-24" /> 
  <h1 className="font-bold text-base">{pchose[0].name[0].toUpperCase()+pchose[0].name.slice(1).toLowerCase()}</h1>
  { mode!="" && <> <h1 className="font-bold text-base">{mode}-:{pmode}</h1> </>}
  </>
  }
  </div>
  <h1 className="font-bold text-base">{ppoint}</h1>
  </div>
 <div className="flex mr-2 flex-col items-center justify-center gap-6 text-base font-bold">
  <h1 className="font-bold text-base">Computer</h1>
  <div className="flex flex-col items-center justify-center gap-2 text-base font-bold">
  { cchose.length>0 && <>
  <img src={cchose[0].sprites.other.dream_world.front_default} className="w-24 h-24" /> 
  <h1 className="font-bold text-base">{cchose[0].name[0].toUpperCase()+cchose[0].name.slice(1).toLowerCase()}</h1>
  { mode!="" && <h1 className="font-bold text-base">{cstat}-:{cmode}</h1>}
  </>
  }
  </div>
  <h1 className="font-bold text-base">{cpoint}</h1>
  </div>
  </div>
  { toggle===false && player.length!=0 && <>
<div className="w-full flex my-2 flex-row flex-wrap justify-center gap-y-4 gap-x-6">
{
  player.map((i)=>{
    return(<>
<div onClick={()=>start(i)} className="flex justify-center items-center">
  <img src={i.sprites.other.dream_world.front_default}   className="h-16 w-16"/>
  </div>
    </>)
  })
}
</div>
</>
}
{
  toggle===true && <>
    <div className="w-full flex flex-col gap-4 text-center font-bold text-base">
  <h1>Choose Mode</h1>
  <div className="w-full flex my-4 flex-row flex-wrap justify-center gap-y-4 gap-x-6">
{
  modes.map((i)=>{
    return(<>
 <button className="w-28 py-2 px-2 flex justify-center items-center bg-sky-700 text-white rounded-md font-bold" onClick={()=>decide(i)}>{i}</button>
    </>)
  })
}
</div>
</div>
  </>
}
{
  player.length===0 && toggle==false && <>
  <div className="w-full flex flex-col gap-4 text-center font-bold text-base">
  <h1>{ppoint>cpoint?"Winner is-: Player":(cpoint===ppoint?"Draw":"Winner is-: Computer")}</h1>
  <div className="w-full flex  flex-row flex-wrap justify-center gap-y-4 gap-x-6">
  { ppoint>cpoint ? <>
{
  resp.map((i)=>{
    return(<>
<div  className="flex justify-center items-center">
  <img src={i.sprites.other.dream_world.front_default}   className="h-12  w-12"/>
  </div>
    </>)
  })
}
</> :(cpoint> ppoint ? <>
{
  resc.map((i)=>{
    return(<>
<div  className="flex justify-center items-center">
  <img src={i.sprites.other.dream_world.front_default}   className="h-12 w-12"/>
  </div>
    </>)
  })
} </> : "")
}
</div>
  </div>
  <div className="w-full flex justify-center items-center">
 <button className="w-28 py-2 px-2 flex justify-center items-center bg-sky-700 text-white rounded-md font-bold" onClick={()=>window.location.reload()}>Restart</button>
 </div>
  </>
}
  </>
}
</div>
  </>
  }
  </>
  )
}
export default Play;