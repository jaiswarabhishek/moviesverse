import { useState, useEffect } from 'react'
import {fetchDataFromApi} from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import {getGenres ,  getApiConfig} from './store/homeSlice'
import { BrowserRouter, Route , Routes } from "react-router-dom"

import Header from './components/header/header'
import Footer from './components/footer/footer'
import Home from './pages/home/home'
import Details from './pages/details/details'
import SearchResult from './pages/searchResult/searchResult'
import Explore from './pages/explore/explore'
import PageNotFound from './pages/404/pageNotFound'




function App() {
 
  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  const {url} = useSelector(state => state.home)


  useEffect(() => {
   
    fetchApiConfig()
    genresCall()

  }, [

    
  ])

  const fetchApiConfig = async () => {
    const data = await fetchDataFromApi('/configuration')
  
     const url={
      backdrop: data?.images?.secure_base_url + "original",
      poster: data?.images?.secure_base_url + "original",
      profile: data?.images?.secure_base_url + "original",
     }


    dispatch(getApiConfig( url))
  }


  const genresCall = async () => {
    let promises = []
    let endPoint =["tv","movie"]
    let allGenres = {}
    endPoint.forEach((endpoint)=>{
      promises.push(fetchDataFromApi(`/genre/${endpoint}/list`))
    })

    const data = await Promise.all(promises)
    data.map(({genres})=>{
      return genres.map((genre)=>{
        return allGenres[genre.id] = genre
      }
      )
    })
    dispatch(getGenres(allGenres))

   
  }





  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
