import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const PlayButton = (props) => {
    const {
        play,
        togglePlay,
        preview
    } = props;

    if(preview === null){
        return null;
    }

    return (
        <Button
            inverted
            className='play-button'
            size='huge'
            circular
            onClick={togglePlay}
        >
            {play ? (
                <Icon name='pause'/>
            ) : (
                <Icon name='play'/>
            )}
        </Button>
    );
}

PlayButton.propTypes = {
    play: PropTypes.bool,
    preview: PropTypes.string,
    togglePlay: PropTypes.func
};

export default PlayButton;