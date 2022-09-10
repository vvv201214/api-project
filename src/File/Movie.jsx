import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./Style.css"

export default function Movie(props) {
    const [info, setInfo] = useState([]);
    const [count, setCount] = useState(0);

    function showMore(id){
        setCount(id);
    }
    function showLess(e){
        setCount(null);
    }
    function getHtmlFromSummary(summary){
        let parser = new DOMParser();
        let sum = parser.parseFromString(summary, "text/html");
        return sum.body.firstChild.textContent;
    }

    useEffect(()=>{
        let url = `https://api.tvmaze.com/search/shows?q=${props.inputVal}`;
        axios.get(url)
        .then((res)=>{
            console.log(res.data);
            setInfo([...(res.data)]);
        })
    },[props])

    return (
    <div className='movie'>
        {(info.length > 0) ? info.map((elem) => {
            return(
                <div className='card mb-5' key={elem.show.id}>
                    {count!==elem.show.id ? <div className='card-body'>
                        <div>{(elem.show.image !== null) ? <img className='card-img-top' src={elem.show.image.medium} /> : <div className='card-img-top no-image'>Image not found</div>}</div>
                        <div className='card-title mt-3'><h6>{elem.show.name}</h6></div>
                        {(elem.show.rating.average !== null) ? <div className='card-text'> ⭐ {elem.show.rating.average}</div> : <div className='card-text'>⭐ 0.0</div>}
                        <div className='summary1 card-text'>{getHtmlFromSummary(elem.show.summary)}</div>
                        <button onClick={(e)=>{showMore(elem.show.id)}} className='btn-warning mt-2'>Read More</button>
                    </div> :
                    <div className='card-body'>
                        <div className='card-title mt-3'><h6>{elem.show.name}</h6></div>
                        <div className='summary2 card-text'>{getHtmlFromSummary(elem.show.summary)}</div>
                        <button onClick={(e)=>{showLess(e)}} className='btn-danger mt-2'>Read Less</button>
                    </div>}
                </div>
            )
        }) :  ((props.inputHitted && props.inputVal.length !== 0) && <div>sorry show not found !!</div>)}
    </div>
  )
}
