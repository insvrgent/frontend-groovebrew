// client/src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import Dashboard from './page/Dashboard';
import Shop from './page/Shop';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';

import Socketting from './components/Socketting';
import checkToken from './components/CheckToken';
import superAdminComponent from './components/SuperAdminComponent';

const ENDPOINT = '/';

function App() {
    const [socket, setSocket] = useState(null);
    const [socketId, setSocketId] = useState('');
    const [user, setUser] = useState([]);
    const navigate = useNavigate(); // Using useNavigate for navigation

    useEffect(() => {
        const newSocket = socketIOClient(ENDPOINT);
        setSocket(newSocket);

        // Listen for the connect event
        newSocket.on('connect', () => {
            setSocketId(newSocket.id);
        });

        // Clean up the socket connection when the component unmounts
        return () => newSocket.close();
    }, []);

    useEffect(() => {
        const validateToken = async () => {
            const checkedtoken = await checkToken();
            if (checkedtoken.ok) {
                setUser(checkedtoken.user.user);
                if (checkedtoken.user.user.cafeId != null) {
                    navigate('/shop/' + checkedtoken.user.user.cafeId);
                }
                console.log(user);
            }
        };
        validateToken();
    }, [navigate]);

    // useEffect(() => {
    //     const updateSocketId = async () => {
    //         if (socketId) {
    //             const success = await Socketting.setClerkSocket(socketId);
    //             console.log('Socket ID sent:', success);
    //         }
    //     };
    //     if(user.user.roleId == 2) updateSocketId();
    // }, [socketId]); // Run this effect whenever socketId changes

    return (
        <div className="App">
            <header className="App-header">
                <p>Socket ID: {socketId ? socketId : 'Connecting...'}</p> {/* Display Socket ID */}
                <Routes>
                    <Route path="/" element={<Dashboard user={user} />} />
                    <Route path="/shop/:shopId" element={<Shop user={user} socket={socket} />} />

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/login/:shopId" element={<LoginPage />} />
                    
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </header>
        </div>
    );
}

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
