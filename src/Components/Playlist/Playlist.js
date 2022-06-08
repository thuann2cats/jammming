import React from 'react';
import {TrackList} from '../TrackList/TrackList';
import './Playlist.css';

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange(evt) {
        this.props.onNameChange(evt.target.value);
    }
    render() {
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} value={this.props.playlistName}/>
                <TrackList onRemove={this.props.onRemove} isRemoval={true} tracks={this.props.playlistTracks} />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}