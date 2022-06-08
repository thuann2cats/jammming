import React from 'react';
import {Track} from '../Track/Track';
import './TrackList.css';

export class TrackList extends React.Component {
    render() {
        // console.log(this.props.tracks);
        return (
            <div className="TrackList">
            {/* <!-- You will add a map method that renders a set of Track components  --> */}
            {
                
                this.props.tracks.map(track => {
                    return <Track isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} onRemove={this.props.onRemove} track={track} key={track.id} />
                })
            }

            </div>
        );
    }
}