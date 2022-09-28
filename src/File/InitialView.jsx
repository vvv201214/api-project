import React, {useEffect, useState, useRef} from 'react'
import axios from "axios";

export default function InitialView() {
    let posters = [
        "https://webneel.com/daily/sites/default/files/images/daily/01-2020/sama-movie-poster-design.preview.jpg",
        "https://cdn.shopify.com/s/files/1/0969/9128/products/Hollywood_Movie_Poster_-_Akira_9a34984c-1d5f-4018-aa4b-2e0414503850.jpg?v=1569192508",
        "https://webneel.com/daily/sites/default/files/images/daily/01-2019/4-movie-poster-design-india-tamil-jetlee-prathoolnt.jpg",
        "https://www.newcanaanymca.org/wp-content/uploads/2021/11/Moana-Movie-Poster-landscape.jpg",
        "https://images.thedirect.com/media/article_full/spider-man-no-way-home-poster-doc-ock.jpg",
        "https://i.pinimg.com/736x/2f/85/ac/2f85acffe4d99a7d92ec9869593f8b96.jpg",
        "https://webneel.com/daily/sites/default/files/images/daily/01-2019/12-movie-poster-design-indian-tamil-8thottakkal-prathoolnt.jpg",
        "https://www.signs.com/blog/wp-content/uploads/2019/02/MoviePoster.jpg",
        "https://webneel.com/wnet/file/images/11-16/10-enders-game-movie-poster-designs.jpg",
        "https://webneel.com/daily/sites/default/files/images/daily/01-2019/6-movie-poster-design-kollywood-tamil-imaikanodigal-prathoolnt.jpg",
        "https://webneel.com/wnet/file/images/11-16/17-shrooms-brilliant-movie-poster-design.preview.jpg"
    ]

    const [info, setInfo] = useState([]);
    const [count, setCount] = useState(0);
    let posterRandomIndex = useRef(Math.ceil(Math.random()*(posters.length-2)));

    let popularShow = "asdkium";
    let sunStringIndex = Math.ceil(Math.random()*(popularShow.length - 1));

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
        let url = `https://api.tvmaze.com/search/shows?q=${popularShow.substring(0, sunStringIndex)}`;
        axios.get(url)
        .then((res)=>{
            setInfo([...(res.data)]);
        }) 
    },[])


  return (
    <>
        <div id="carouselExampleIndicators" className="carousel slide"  data-interval="3000">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active front-card-img" >                
                    <div className="card front-card-img">
                        <a href='/'>
                        <img className="d-block w-100 card-img " src={posters[posterRandomIndex.current]} alt="Card image" />
                        </a>
                    </div>                
                </div>
            
            <div className="carousel-item front-card-img" >
                <div className="card front-card-img">
                    <a href='/'>
                    <img className="d-block w-100 card-img " src={posters[(posterRandomIndex.current+1)]} alt="Card image" />
                    </a>
                </div>                 
            </div>

            <div className="carousel-item front-card-img" >
                <div className="card front-card-img">
                    <a href='/'>
                    <img className="d-block w-100 card-img " src={posters[(posterRandomIndex.current-1)]} alt="Card image" />
                    </a>
                </div>                   
            </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>
    </div>

    <h4 className='my-2'>Popular and Trending Show</h4>
    <div className='movie items'>
        {(info.length > 0) && info.map((elem) => {
            return(
                <div className='main-card card mb-5' key={elem.show.id}>
                    {count!==elem.show.id ? <div className='card-body'>
                        <div>{(elem.show.image !== null) ? <img className='card-img-top' src={elem.show.image.medium} /> : <div className='card-img-top no-image'>Image not found</div>}</div>
                        <div className='card-title mt-3'><h6>{elem.show.name}</h6></div>
                        {(elem.show.rating.average !== null) ? <div className='card-text'> ⭐ {elem.show.rating.average}</div> : <div className='card-text'>⭐ 0.0</div>}
                        <div className='summary1 card-text'>{getHtmlFromSummary(elem.show.summary)}</div>
                        <button onClick={(e)=>{showMore(elem.show.id)}} className='btn btn-warning mt-2'>Read More</button>
                    </div> :
                    <div className='card-body'>
                        <div className='card-title mt-3'><h6>{elem.show.name}</h6></div>
                        <div className='summary2 card-text'>{getHtmlFromSummary(elem.show.summary)}</div>
                        <button onClick={(e)=>{showLess(e)}} className='btn btn-danger mt-2'>Read Less</button>
                    </div>}
                </div>
            )
        }) }
    </div>



    </>
  )
}
