import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Music() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = window.bootstrap.auth.getToken();
        const response = await axios.get('https://buildingmfe.maxgallo.io/api/songs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSongs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSongs();
  }, []);

  const handlePlayClick = async (song) => {
    const context = new AudioContext();
    const audio = new Audio(song.previewUrl);
    const source = context.createMediaElementSource(audio);
    source.connect(context.destination);
    await audio.play();
  };

  const handleSignOutClick = () => {
    window.bootstrap.auth.setToken(null);
    window.bootstrap.router.navigateTo('/hello');
  };

  return (
    <div>
      <h1>Music</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.title} - <button onClick={() => handlePlayClick(song)}>Play</button>
          </li>
        ))}
      </ul>
      <button onClick={handleSignOutClick}>Sign Out</button>
    </div>
  );
}

export default Music;
