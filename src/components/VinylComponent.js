import React from 'react';
import './VinylComponent.css';
import vinylImage from './vinyl.png';

const VinylComponent = ({ album }) => {
  return (
    <div className="circle-container">
      <div className="large-circle" style={{ backgroundImage: `url(${vinylImage})` }}></div>
      <div className="small-circle" style={{ backgroundImage: `url(${album})` }}></div>
    </div>
  );
};

export default VinylComponent;
