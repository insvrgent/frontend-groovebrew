// client/src/components/Spotify.js

import React, { useState, useEffect } from 'react';
import './Popular.css';

const Popular = () => {
    return (
        <div>
        <h4>disukai orang banyak</h4>
        <div className="rounded-component">
            <img src='https://media-cdn.tripadvisor.com/media/photo-p/11/7a/f9/ab/el-coffe-shop-pty.jpg' style={{objectFit: "contain",height: "200px"}}></img>
        </div>
        </div>
    );
}

export default Popular;
