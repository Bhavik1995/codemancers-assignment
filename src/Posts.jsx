import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';


import './posts.css';

const Posts = () => {
    const temp = JSON.parse(localStorage.getItem("Name","Image") || "[]");

    const [state, setState] = useState(temp);

  const deleteItem = removeindex => {
    
    setState(s => s.filter((_, index) => index !== removeindex));

    window.location.reload();
  };

  useEffect(()=>{
    localStorage.setItem('Name', JSON.stringify(state));
    // localStorage.setItem('Image', JSON.stringify(state));
  },[state])
  return (
    <>
        <div className='posts-container'>


            <div className='posts-data-content'>
                <div className='posts-header'>
                    <h3>All Posts</h3>
                </div>

                <Link className='link-data' to="/"><i className="fa fa-arrow-left" aria-hidden="true"></i> Go back</Link>
            </div>      

                 <div className='post-data'>
                    <div className='post-data-content'>
                       {
                           temp.map((val,index)=>{
                                return(
                                    <>
                                        <div className='posts-data' key={index}>
                                            <button type='button' className="delete-post" onClick={()=>deleteItem(index)}>x</button>
                                            <img src={val.image} alt={val.image}/>
                                            
                                            <h3>{val.name}</h3>

                                        </div>
                                    </>
                                )
                           })
                       }
                    </div>
                </div> 
        </div>
    </>
  )
}

export default Posts