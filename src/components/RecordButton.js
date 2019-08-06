import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import RecordingText from './RecordingText';


const RecordButton = (props) => {
    const {
        recordAudio,
        recording
    } = props;

    return (
        <div className='button-content'>
            {/* <Transition animation='pulse' duration={2000} visible={visible}> */}
                <Button circular onClick={recordAudio} className='record-button'>
                    <RecordingText state={recording}/>
                </Button>
            {/* </Transition> */}
        </div>
    );
}

RecordButton.propTypes = {
    recordAudio: PropTypes.func,
    recording: PropTypes.string
}

export default RecordButton;