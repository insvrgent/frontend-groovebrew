// client/src/components/Spotify.js

import React, { useState, useEffect } from 'react';
import MusicComponent from './MusicComponent';
import './Spotify.css';

const Spotify = ({ user, navigate, shopId, socket, isSpotifyNeedLogin }) => {
    const [songName, setSongName] = useState('');
    const [debouncedSongName, setDebouncedSongName] = useState(songName);
    const [currentSong, setCurrentSong] = useState([]);
    const [songs, setSongs] = useState([]);
    const [queue, setQueue] = useState([]);
    const [paused, setPaused] = useState([]);

    useEffect(() => {
        if (!socket) return;

        socket.on('searchResponse', (response) => {
            console.log(response);
            setSongs(response);
        });

        socket.on('updateCurrentSong', (response) => {
            setCurrentSong(response);
            console.log(response);
        });

        socket.on('updateQueue', (response) => {
            setQueue(response);
            console.log(queue);
        });

        socket.on('updatePlayer', (response) => {
            setPaused(response.decision);
        });

        return () => {
            socket.off('searchResponse');
        };
    }, [socket]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSongName(songName);
        }, 300);

        // Cleanup function to clear the timeout if songName changes
        return () => {
            clearTimeout(handler);
        };
    }, [songName]);

    useEffect(() => {
        if (socket != null && debouncedSongName) {
            socket.emit('searchRequest', { shopId, songName: debouncedSongName });
        }
    }, [debouncedSongName, shopId, socket]);

    const handleInputChange = (event) => {
        setSongName(event.target.value);
        console.log(user)
    };

    const onRequest = (trackId) => {
        const token = localStorage.getItem("auth");
        if (socket != null && token) {
            socket.emit('songRequest', { token, shopId, trackId });
            setSongName("");
        }
    };

    const onDecision = (trackId, vote) => {
        const token = localStorage.getItem("auth");
        if (socket != null && token) socket.emit('songVote', { token, shopId, trackId, vote });
    };

    const handlePauseOrResume = (trackId, vote) => {
        const token = localStorage.getItem("auth");
        if (socket != null && token) {
            socket.emit('playOrPause', { token, shopId, action: paused ? "pause" : "resume" });
            console.log(paused);
            setPaused(!paused);
        }
    };

    const handleSpotifyLogin = () => {
        const token = localStorage.getItem("auth");
        const loginUrl = `http://localhost:5000/login?token=${token}`; // Construct the login URL with the token as a query parameter
        window.location.href = loginUrl; // Redirect the user to the login URL
    };

    const handleLogin = () => {
        navigate(`/login/${shopId}`);
    };

    return (
        <div className="rounded-component">
            {user.roleId === 2 ? (
                isSpotifyNeedLogin ? (
                    <button onClick={handleSpotifyLogin}>
                        Login to Spotify
                    </button>
                ) : (
                    <>
                        <button className="input-bar">It's all set</button>
                        {paused ? (
                            <button className="input-bar" onClick={handlePauseOrResume}>
                                Pause
                            </button>
                        ) : (
                            <button className="input-bar" onClick={handlePauseOrResume}>
                                Resume
                            </button>
                        )}
                    </>
                )
            ) : (
                <>
                    {songName.length < 1 && queue.length < 1 && <h4>Request lagu buat kamu yang paling keren</h4>}
                    {user.length !== 0 ? (
                        <input
                            type="text"
                            value={songName}
                            onChange={handleInputChange}
                            placeholder="Request lagu kesukaanmu yang kamu pikir keren itu"
                            className="input-bar"
                        />
                    ) : (
                        <button onClick={handleLogin} className="input-bar">
                            Login untuk request lagu kesukaanmu
                        </button>
                    )}
                </>
            )}
            {songName.length < 1 && currentSong != undefined && currentSong.album != undefined && currentSong.album.images[0] != undefined &&
                <div className="song-list">
                    <h4>SEDANG DIPUTAR</h4>
                    <MusicComponent min={0} max={0} songg={currentSong} />
                </div>
            }
            {songName.length > 0 && songs &&
                <div className="song-list">
                    {songs.map((song, index) => (
                        <MusicComponent min={0} max={100} key={index} songg={song} onDecision={(e) => onRequest(song.trackId)} />
                    ))
                    }
                </div>
            }
            {songName.length < 1 && queue.length > 0 && queue &&
                <div className="song-list">
                    <h4>queue</h4>
                    {queue.map((song, index) => (
                        <MusicComponent min={-100} max={100} key={index} songg={song} onDecision={(vote) => onDecision(song.trackId, vote)} />
                    ))
                    }
                </div>
            }
        </div>
    );
};

export default Spotify;
