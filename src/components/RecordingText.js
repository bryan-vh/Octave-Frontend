import React from 'react';
import PropTypes from 'prop-types';

const RecordingText = (props) => {
    const { state } = props;

    if(state === 'ready'){
        return <h2>Listen</h2>
    }
    else if(state === 'listening'){
        return <h2>Listening...</h2>
    }
    else {
        return <h2>Sending...</h2>
    }
}

RecordingText.propTypes = {
    state: PropTypes.string
}

export default RecordingText;