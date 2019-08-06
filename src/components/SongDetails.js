import React from 'react';
import { Statistic } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SongDetails = (props) => {
    const {
        title,
        artist,
        duration,
        tempo
    } = props;

    return (
        <div className='song-details-container'>
            <div className='song-details'>
                <h1>{title}</h1>
                <h2>{artist}</h2>
            </div>
            <div className='statistics-container'>
                <Statistic className='bpm-statistic' label='duration' value={duration}/>
                <Statistic className='bpm-statistic' label='BPM' value={tempo}/>
            </div>
        </div>
    );
}

SongDetails.propTypes = {
    title: PropTypes.string,
    artist: PropTypes.string,
    duration: PropTypes.string,
    tempo: PropTypes.number
};

export default SongDetails;