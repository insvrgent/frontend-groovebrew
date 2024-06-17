import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CafeDashboard.css'; // Import the CSS file for styling

// Images for food and beverage items
import coffeeImage from './b1.jpg';
import pastryImage from './f1.png';
import smoothieImage from './f2.png';

import Popular from '../components/Popular';
import Spotify from '../components/Spotify';
import Order from '../components/Order';

const Shop = ({ user, socket }) => {
  const navigate = useNavigate();
  const { shopId } = useParams();
  const [isSpotifyNeedLogin, setNeedSpotifyLogin] = useState(false);
  useEffect(() => {
    if (!socket) return;

    const token = localStorage.getItem("auth");
    const joinRoom = async () => {
      try {
        socket.emit('join-room', {token, shopId});
      } catch (error) {
        console.error('Error fetching socket ID:', error);
      }
    };

    joinRoom();
    
    socket.on('joined-room', (response) => {
      const { isSpotifyNeedLogin } = response;
      setNeedSpotifyLogin(isSpotifyNeedLogin);
    });

    return () => {

    };
}, [socket]);

  useEffect(() => {
  }, [shopId]);

  const beverages = [
    { name: "Coffee", image: coffeeImage },
    { name: "Coffee", image: coffeeImage },
  ];

  const foodItems = [
    { name: "Pastry", image: pastryImage },
    { name: "Smoothie", image: smoothieImage }
  ];

  return (
    <div className="cafe-dashboard">
      <header className="cafe-header">
        <h5>WELCOME TO OUR CAFE {shopId}</h5>
      </header>
      <Spotify user={user} navigate={navigate} shopId={shopId} socket={socket} isSpotifyNeedLogin={isSpotifyNeedLogin}/>
      <main className="cafe-main">
        {/* Beverage Section */}
        <section className="cafe-section">
          <h2 className="cafe-section-title">Beverages</h2>
          <div className="cafe-item-container">
            {beverages.map((item, index) => (
              <div className="cafe-item" key={index}>
                <img src={item.image} alt={item.name} className="cafe-item-image" />
                <p className="cafe-item-name">{item.name}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Food Section */}
        <section className="cafe-section">
          <h2 className="cafe-section-title">Food</h2>
          <div className="cafe-item-container">
            {foodItems.map((item, index) => (
              <div className="cafe-item" key={index}>
                <img src={item.image} alt={item.name} className="cafe-item-image" />
                <p className="cafe-item-name">{item.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="cafe-footer">
        <p>&copy; {new Date().getFullYear()} Our Cafe. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Shop;
