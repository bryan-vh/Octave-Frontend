import React from 'react';
import { Statistic } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import RecordButton from './RecordButton';


const MainContent = (props) => {
    const { 
        tries,
        recordAudio,
        recording
    } = props;

    return (
        <div className='main-content'>
            <h1>Any song's tempo in seconds</h1>
            <p>Octave will identify the song and get its info for you.</p>
            <Statistic.Group>
                <Statistic
                    label='Tries'
                    value={tries}
                />
            </Statistic.Group>
            <RecordButton recordAudio={recordAudio} recording={recording}/>
        </div>
    );
}

MainContent.propTypes = {
    tries: PropTypes.number,
    recordAudio: PropTypes.func,
    recording: PropTypes.string
};

export default MainContent;