import React, {useState } from 'react';

import logo from './images/logo.jpg';
import { Link } from 'react-router-dom';
import './sendData.css';

import Popup from './Popup';

const SendData = () => {

    const GIPHY_API = "https://api.giphy.com/v1/gifs/search?api_key=AYZPE1y6oYslDUseLRHDBIsXKI2S3Kq2&limit=10&offset=0&q=";

    const [isOpen, setIsOpen] = useState(false);

    const [postData, setPostData] = useState("");
    const [search, setSearch] = useState("");
    const [gifs, setGifs] = useState([]);
    const [loadingState, setLoadingState] = useState(false);
    const [ fullSize, setFullSIze ] = useState(false)

      const handle = () => {
        let nameArray = localStorage.getItem("Name")
        let imageArray = localStorage.getItem("Image")
        let temp = [];

        if(nameArray !== null && imageArray !== null){
            temp = [...JSON.parse(nameArray,imageArray)]
        }

        temp.push({
            name: postData,
            image: fullSize,
            _id: Math.floor(Math.random() * 1000000)
        })

        localStorage.setItem("Name",JSON.stringify(temp))
        localStorage.setItem("Image",JSON.stringify(temp))

        console.log("test",temp)
    };
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const getImage = (gif) =>{
        setFullSIze(gif);
    }

    let searchGif = () => {
        if(search.length > 0){
          setLoadingState(true);
          fetch(GIPHY_API+search)
          .then((res)=>{
            setLoadingState(false);
            return res.json();
          })
          .then((result)=>{
            console.log(result);
            setGifs(result.data.map((gif)=>{
              return gif.images.fixed_height.url;
            }))
          })
          .catch(()=>{
            alert("Something went wrong");
            setLoadingState(false);
          })
        }
      }
  return (
      
    <>
        <div className='heading-container'>
            <div className='heading-content'>
                <div className='header'>
                    <h3>Hello Welcome</h3>
            </div>

            <div className='header-data'>
                <img className='header_image' src={logo} alt='logo'/>
                <input type="text" value={postData} placeholder='Write something here...' onChange={(e) => setPostData(e.target.value)}/>

                <div className='header_data'>
                    {
    
                        <img src={fullSize} hidden={!fullSize} alt={fullSize}/>
                    }
                </div>
            </div>

                <div className='header-gif-button'>
                   
                    <button type="button" onClick={togglePopup}><i class="fa-solid fa-gif"></i>GIF</button>
                </div>

                {isOpen && <Popup
                    content={<>
                        <div className='search-bar'>
                            <input type="text" placeholder='Search GIFS across apps..' value={search}
                                onChange={(e)=>setSearch(e.target.value)} 
                            />
                            <button onClick={searchGif}>Search</button>
                        </div>

                        <div className='image-content'>
                            {
                                (loadingState) ? (
                                    <div className="loading">
                                        <div className="loader">
                                        </div>
                                    </div>
                                ) : (
                                    <div className="list">
                                    {
                                        gifs.map((gif,index)=>{
                                        return (
                                            <div className="item" key={index}>
                                                <img src={gif} alt="giphy_image"
                                                    onClick={()=>{
                                                        getImage(gif)
                                                    }}
                                                />  
                                            </div>
                                            )
                                        })
                                    }
                                    </div>
                                )
                            }
                        </div>
                    </>}
                    handleClose={togglePopup}
                />}
            
          
                <div className='post-data-button'>
                    <Link to = "/posts">
                        <button type='submit' onClick={handle}>Post</button>
                    </Link>
                </div>
            </div>
           
        </div>
    </>
  )
}

export default SendData