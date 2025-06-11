import React from 'react';
import './Css/Home.css';
import img1 from '../images/zzz.jpg'
 
const Home = () => {
    return (
        <div id='wrap'>
            <h1 className='texth1'>Healing Space</h1>
            <p className='textp'>환영합니다! 이곳은 Healing Space입니다.</p>
            <img className='HomeImage' src={img1}></img>
        </div>
    );
};

export default Home;
