import React from 'react'
import "./style.scss"
import { useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import useFetch from '../../hooks/useFetch'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from  './videosSection/VideosSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'

function details() {
 const {mediaType , id} = useParams()
//  console.log(mediaType , id)

 const {data , loading} = useFetch(`/${mediaType}/${id}/videos`)
 const {data:credits , loading:creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div>

        <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
        <Cast data={credits?.cast} loading={creditsLoading} />
        <VideosSection data={data} loading={loading} />
        <ContentWrapper>

          
            <Similar mediaType={mediaType} id={id} />


            <Recommendation mediaType={mediaType} id={id} />
        </ContentWrapper>

    </div>
  )
}

export default details
