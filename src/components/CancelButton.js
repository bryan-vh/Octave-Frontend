import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CancelButton = (props) => {
    const { onClick } = props; 

    return (
        <div className='cancel-container'>
            <Button 
                className='cancel-button' 
                size='big' 
                circular 
                icon='times'
                onClick={onClick}
            />
        </div>
    );
}

CancelButton.propTypes = {
    onClick: PropTypes.func
};

export default CancelButton;