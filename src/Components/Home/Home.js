import React from 'react'
import Ride from '../Ride/Ride';
import './Home.css';
import { fakeInfo } from './riderInfo';
const Home = () => {
    const [data, setData] = [fakeInfo];
    return (
        <>
            <section className="home-area">
                <div className="img-overly">
                    <div className="grid-layout">
                        {
                            data.map((info) => <Ride info={info} />)
                        }
                    </div>
                </div>
            </section>   
        </>
    )
}

export default Home
