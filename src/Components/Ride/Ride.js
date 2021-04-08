import React from 'react'
import { Link } from 'react-router-dom';
import './Ride.css';
const Ride = ({info}) => {
    return (
        <>
            <Link className='link' to={`vehicle-rental/${info.id}`} >
            <div className="ride-area">
                <img src={info.imgUrl} alt=""/>
                <h3>{info.name}</h3>
            </div> 
            </Link>  
        </>
    )
}

export default Ride
