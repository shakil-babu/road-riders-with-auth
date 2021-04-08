import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { fakeInfo } from '../Home/riderInfo';
import './VehicleRental.css';
import {FaMale} from 'react-icons/fa';
import { GoogleMap } from './GoogleMap';

 
const VehicleRental = () => {
    const {Id} = useParams();
    const actualInfo = fakeInfo.find(info => info.id === Id);
    const [info, setInfo] = useState(actualInfo)
    const [error, setError] = useState('');
    const newInfo = [actualInfo, actualInfo, actualInfo]
    // searchinfo
    const [searchInfo, setSearchInfo] = useState(false);
    // pick info
    const [pickInfo, setPickInfo] = useState({pickFrom:'', pickTo:""})
    // blur handler
    const blurHandler = (e) => {
        if(e.target.name === 'pickfrom'){
            setPickInfo({...pickInfo, pickFrom:e.target.value})
        }
        if(e.target.name === 'pickto'){
            setPickInfo({...pickInfo, pickTo:e.target.value})
        }
    }
    const searchHandler = () => {
        if(pickInfo.pickTo === '' && pickInfo.pickFrom === ''){
            setError("Please fill in blank!")
        }else{
            setSearchInfo(true)
        }
    }
    let count = 3;
    return (
      <count>
        <section className="area">
          <div className="pick-details col-5">
            {searchInfo ? (
              <div className="pick-up-info">
                <h4 className="destination-name">
                  {pickInfo.pickFrom} to <br /> {pickInfo.pickTo}
                </h4>
                {newInfo.map((item) => {
                  return (
                    <div className="vehicle-info">
                      <div className="flex">
                        <img src={item.imgUrl} alt="" />
                        <p>{item.name}</p>
                      </div>
                      <div className="flex">
                        <FaMale className="icon" />
                        <p>{item.random}</p>
                      </div>
                      <p>{item.rideShare}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="pick-info">
                  
                {<p style={{color:'red', textAlign:'center'}}>{error}</p>}
                <p>Pick From</p>
                <input onBlur ={blurHandler} name='pickfrom' type="text" placeholder='Pick From'/>
                <p>Pick To</p>
                <input onBlur ={blurHandler} name='pickto' type="text" placeholder='Pick to'/>
                <button
                  onClick={searchHandler}
                  className="search-btn"
                >
                  Search
                </button>
              </div>
            )}
          </div>
          <div className="col-7">
                <GoogleMap/>
          </div>
        </section>
      </count>
    );
}
export default VehicleRental ;
