import React from 'react';
import axios from 'axios';

import SongsList from '../SongsList/SongsList';
import { getAuthToken } from '../../bootstrap';
import Footer from '../Footer/Footer';

class Music extends React.Component {
  state = {
    songs: [],
    selectedSong: null,
    isPlaying: false,
  }

  audio = new Audio()

  componentDidMount() {
    this.audio.onplay = () => this.setIsPlaying(true);
    this.audio.onpause = () => this.setIsPlaying(false);
    axios({
      method: 'get',
      url: 'https://buildingmfe.maxgallo.io/api/songs',
      headers: {
        authorization: `Bearer ${getAuthToken()}`
      },
    })
      .then(response => {
        const songs = response && response.data && response.data.data && response.data.data.songs;
        this.setSongs(songs);
      });
  }

  setIsPlaying = isPlaying => {
    this.setState({
      songs: this.state.songs,
      selectedSong: this.state.selectedSong,
      isPlaying,
    })
  }

  setSongs = songs => {
    this.setState({
      songs,
      selectedSong: null,
      isPlaying: false,
    });
  }

  setSelectedSong = selectedSong => {
    if (selectedSong === this.state.selectedSong) {
      this.audio.paused ? this.audio.play() : this.audio.pause();
      return;
    }
    this.setState({
      songs: this.state.songs,
      selectedSong,
      isPlaying: true,
    });
    this.audio.src = selectedSong.previewUrl;
    this.audio.play()
  }

  render() {
    return (
      <React.Fragment>
        <SongsList
          songs={this.state.songs}
          setSelectedSong={this.setSelectedSong}
          selectedSong={this.state.selectedSong}
          isPlaying={this.state.isPlaying}
        />
        <Footer />
      </React.Fragment>
    )
  };
}

export default Music;
