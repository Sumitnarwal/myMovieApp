import React, { useEffect, useState } from 'react'
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWraper/ContentWraper';

const HeroBanner = () => {
    const [background, setBackground] = useState("")
    const [query, setQuery] = useState("")
    const { data, loading } = useFetch("/movie/upcoming")
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    console.log("data", background)
    // console.log("object" ,url.images.base_url )

    useEffect(() => {
        const bg = url?.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg)
    }, [data])
    const searchQueryhandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className='heroBanner'>
            {!loading && <div className='backdrop-img'>
                <Img src={background} />
            </div>}
            <div className='opacity-layer'></div>
            <ContentWrapper>
                <div className='heroBannerContent'>
                    <span className='title'>Welcome</span>
                    <span className='subTitle'>Millons of movies, TV Shows and People to discover, Explore now.</span>
                    <div className='searchInput'>
                        <input type='text' placeholder='Search for a movies or tv show....'
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryhandler} />
                        <button>Search</button>
                    </div>
                </div>

            </ContentWrapper>
        </div>
    )
}

export default HeroBanner
