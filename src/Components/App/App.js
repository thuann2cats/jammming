import logo from '../../logo.svg';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import React from 'react';
import Spotify from '../../util/Spotify';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        // {
        //   name: 'Sun is Shining',
        //   artist: 'Axwell /- Ingrosso',
        //   album: 'More Than You Know',
        //   id: 1
        // },
        // {
        //   name: 'Willow',
        //   artist: 'Taylor Swift',
        //   album: 'Evermore',
        //   id: 2
        // },
        // {
        //   name: 'Apologize',
        //   artist: 'Timbaland',
        //   album: 'Shock Value',
        //   id: 3
        // }
      ],
      playlistName: "Enter playlist name...",
      playlistTracks: [
        // {
        //   name: 'Wish I Could',
        //   artist: 'Norah Jones',
        //   album: 'Not Too Late',
        //   id: 4
        // },
        // {
        //   name: 'Always Remember Us This Way',
        //   artist: 'Lady Gaga',
        //   album: 'A Star is Born Soundtrack',
        //   id: 5
        // }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    // console.log(track);
    // console.log("entering addTrack");
    let foundTrack = this.state.playlistTracks.find(playlistTrack => track.id==playlistTrack.id);
    // console.log(foundTrack);
    if (!foundTrack) {
      // console.log("going to append");
      // this.state.playlistTracks.append(track);
      // let newPlaylistTracks = [...this.state.playlistTracks];
      // console.log(newPlaylistTracks);
      // newPlaylistTracks.append(track);
      // console.log(newPlaylistTracks);
      // this.setState( {playlistTracks: this.state.playlistTracks.concat(track)} );
      // console.log("appended");

      let tracks = this.state.playlistTracks;
      tracks.push(track);
      // console.log(tracks);
      // console.log(this.state.playlistTracks);
      this.setState( {playlistTracks: tracks});
      // console.log(this.state.playlistTracks);

    }
    // console.log("exiting addTrack");
  }

  removeTrack(track) {
    this.setState({playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id != track.id) });
  }

  updatePlaylistName(name) {
    this.setState( {playlistName: name });
  }

  savePlaylist() {
    console.log("entering savePlaylist() in App");
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    console.log(trackUris);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState( {
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(results => {
      this.setState( {searchResults: results});
    });
  }

  componentDidMount() {
    // console.log("Entering componentDidMount App");
    //   let newTrack = {
    //     name: 'Apologize',
    //     artist: 'Timbaland',
    //     album: 'Shock Value',
    //     id: 4
    //   };
    // this.removeTrack(newTrack);

    // console.log("here new playlistTracks");
    // console.log(this.state.playlistTracks);
  }
  render() {
    // console.log("Here here");
    // console.log(this.state.playlistTracks);
    // console.log(this.state.playlistName);
    // console.log("Here here SearchResults");
    // console.log(this.state.searchResults);
    
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist onNameChange={this.updatePlaylistName}      
                      onRemove={this.removeTrack}
                      onSave={this.savePlaylist} 
                      playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}
  


export default App;
