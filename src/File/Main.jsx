import React, { useState } from 'react'
import Movie from './Movie';
import Actor from './Actor';
import "./Style.css"

export default function Main() {

    const [input, setInput] = useState("");
    const [show, setShow] = useState(null);
    const [checkInput, setCheckInput] = useState(false);
    let inputValue = (e)=>{
      let val = e.target.value;
      setCheckInput(true);
      setInput(val)
    }

    function showAccordingActor(){
      setShow(1);
    }
    function showAccordingShow(){
      setShow(0);
    }


  return (
    <>
      <div className='mb-5'>
          <div className='container header'>
              <h4>Search your favourite show</h4><br/>
              <input className='mx-1' onClick={showAccordingActor} type={"radio"} value = "Actor" name="choose" id='actor' /><label htmlFor='actor'>Actor</label>
              <input className='ml-3 mx-1' onClick={showAccordingShow} type={"radio"} value = "Show" name="choose" id='show' /><label htmlFor='show'>Show</label>
              <br />
              {(show===1 && input.length===0) ? <div>Enter actor name below</div> : ((show===0 && input.length===0) && <div>Enter show name below</div>)}
              <input className='input' type={"text"} placeholder="eg. friends or shakira" onChange={(e)=>{inputValue(e)}}/><br /><br />
          </div>
          <div className="container">
              {show===1 ? <Actor inputVal = {input} inputHitted = {checkInput}/> : show===0 && <Movie inputVal = {input} inputHitted = {checkInput}/>}
          </div>
      </div>
    </>    
  )
}
