import React from 'react'
import { useState,useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import "./style.scss"
import ContentWrapper from '../contentWrapper/ContentWrapper'
import { useNavigate,useLocation } from 'react-router-dom';
import logo from "../../assets/MovieVerse-logo.png";
function header() {
   const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {

      window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
          setShow("hide");
        } else {
          setShow("top");
        }
        setLastScrollY(currentScrollY);
      }
      );
      return () => {
        window.removeEventListener("scroll", () => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY) {
            setShow("hide");
          } else {
            setShow("top");
          }
          setLastScrollY(currentScrollY);
        }
        );
      }

      


    }, [lastScrollY])

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
      setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (type) => {
      if(type==="movie"){
        navigate("/explore/movie")
      }else{
        navigate("/explore/tv")
      }

    }

    
const searchQueryHandler = (e) => {

    if(e.key==="Enter" && query !==""){
        navigate(`/search/${query}`)
         
        setTimeout(()=>{
       setShowSearch(false)
        }
        ,1000)

    }
    
}

    return (

      <header className={`header ${mobileMenu  ? "mobileView":""} ${show}`}>
        <ContentWrapper>
          <div  className="logo"
          onClick={()=>navigate("/")}
          >
            <h1 className='title'>
              MovieVerse
            </h1>
          </div>
          <ul className="menuItems">
            <li className="menuItem"
            onClick={()=>navigationHandler("movie")}
            >Movies</li>
            <li className="menuItem"
            onClick={()=>navigationHandler("tv")}
            >TV Shows</li>
            <li className="menuItem">
              <HiOutlineSearch onClick={openSearch}  />
            </li>

          </ul>

          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch}  />
{
  mobileMenu ? <VscChromeClose   onClick={()=>setMobileMenu(false)} /> : < SlMenu onClick={openMobileMenu}  />
}

         
    
          </div>


        </ContentWrapper>

       { showSearch && <div className="searchBar">
          <ContentWrapper>
        <div className="searchInput">
            <input type="text"
            onChange={(e)=>setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            placeholder="Search for a movie, tv show, person......" 
            />
           <VscChromeClose   onClick={()=>setShowSearch(false)} />
        </div>
            </ContentWrapper >
        </div>}
      </header>

    )



  
}

export default header
