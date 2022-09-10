import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./Style.css";


export default function Actor(props) {

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
      let url = `https://api.tvmaze.com/search/people?q=${props.inputVal}`;
      axios.get(url)
      .then((res)=>{
          if((res.data).length >= 1){
            let newUrl = `https://api.tvmaze.com/people/${((res.data)[0]).person.id}/castcredits?embed=show`
            axios.get(newUrl)
            .then((newRes)=>{
              setInfo(newRes.data);
            })
          }

      })   
  },[props])


  return (
    <>
        <div className='movie'>
            {(info.length > 0) ? info.map((elem) => {
                return(
                    <div className='card mb-5' key={elem._embedded.show.id}>
                        {count!==elem._embedded.show.id ? <div className='card-body'>
                            <div>{(elem._embedded.show.image !== null) ? <img className='card-img-top' src={elem._embedded.show.image.medium} /> : <div className='card-img-top no-image'>Image not found</div>}</div>
                            <div className='card-title mt-3'><h6>{elem._embedded.show.name}</h6></div>
                            {(elem._embedded.show.rating.average !== null) ? <div className='card-text'>⭐ {elem._embedded.show.rating.average}</div> : <div className='card-text'>⭐ 0.0</div>}
                            <div className='summary1 card-text'>{getHtmlFromSummary(elem._embedded.show.summary)}</div>
                            <button onClick={(e)=>{showMore(elem._embedded.show.id)}} className='btn-warning mt-2'>Read More</button>
                        </div> :
                        <div className='card-body'>
                            <div className='card-title mt-3'><h6>{elem._embedded.show.name}</h6></div>
                            <div className='summary2 card-text'>{getHtmlFromSummary(elem._embedded.show.summary)}</div>
                            <button onClick={(e)=>{showLess(e)}} className='btn-danger mt-2'>Read Less</button>
                        </div>}
                    </div>
                )
            }) :  ((props.inputHitted && props.inputVal.length !== 0) && <div>sorry show not found !!</div>)}
        </div>
    </>
  )
}
