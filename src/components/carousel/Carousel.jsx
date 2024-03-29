import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Genres from '../genres/Genres'
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss"
import CircleRating from "../circleRating/CircleRating";


function Carousel({data , loading ,endpoint ,title}) {
 
    const carouselContainer = useRef();
    const {url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (direction) => {
       // scroll carousel with animation left and right

      const container = carouselContainer.current;

      const scrollAmount = direction==="left" ? container.scrollLeft-(container.offsetWidth+30) : container.scrollLeft+(container.offsetWidth+30)



        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });



    };

    const skItem = () => {
        return(
            <div className="skeletonItem">
                <div className="posterBlock skeleton ">
                    <div className="textBlock">
                        <div className="title skeleton"></div>
                        <div className="date skeleton"></div>
                    </div>
                </div>
            </div>
        )
    }



  return (
    <div className="carousel" >
        <ContentWrapper>
            {title && <div className="carouselTitle">{title}</div>}
            <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />

           {
                !loading ? (
                    <div ref={carouselContainer }  className="carouselItems">
                        {
                            data?.map((item)=>{
                                const posterUrl = item.poster_path ?url.poster +item.poster_path : PosterFallback
                                return(
                                   <div
                                   onClick={()=>{
                                    navigate(`/${item?.media_type || endpoint}/${item?.id}`)
                                   }}

                                    key={item.id} className="carouselItem">

                                        <div className="posterBlock">
                                           <Img src={ posterUrl} />
                                             <CircleRating rating={item.vote_average.toFixed(1)} />

                                             <Genres data={item.genre_ids.slice(0,2)} />
                                        </div>
                                        <div className="textBlock">
                                            <span className="title">{item.title || item.name}</span>
                                            <span className="date">{dayjs(item.release_date || item.first_air_date).format("MMM DD, YYYY")}</span>
                                        </div>

                                   </div>
                                )
                            
                                

                            })
                        }
                    </div>
                    ) :(
                        
                        <div className="loadingSkeleton">
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                )

           }


           

        </ContentWrapper>
      
    </div>
  )
}

export default Carousel
