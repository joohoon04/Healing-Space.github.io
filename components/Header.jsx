import React from 'react';
import './Css/Header.css';


const Header = () => {
    return (
        <header><a href="/"><img className='logo'></img></a>
            <nav>
                <ul>
                    <li><a href="/gallery">Gallery</a></li>
                    <li><a href="/music">Music</a></li>
                    <li><a href="/animals">Animals</a></li>
                    <li><a href="/map">Map</a></li>
                    <li><a href="/calendar">Calendar</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
