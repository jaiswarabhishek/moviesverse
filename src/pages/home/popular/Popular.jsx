import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import { useState , useEffect } from 'react'
import Carousel from '../../../components/carousel/Carousel'



function Popular() {
const [endpoint, setEndpoint] = useState("movie")

const { data, loading } = useFetch(`/${endpoint}/popular`)


     const onTabChange = (tab) => {
        setEndpoint(tab==="Movie" ? "movie" : "tv")

     }

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">Popular</span>
            <SwitchTabs data={["Movie" ,"TV Shows"]} onTabChange={onTabChange } />
        </ContentWrapper>

        <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
      
    </div>
  )
}

export default Popular
