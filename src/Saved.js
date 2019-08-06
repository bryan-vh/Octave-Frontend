import React, { Component } from 'react';
import { Button, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './Saved.css';

export default class Saved extends Component {
    constructor(props){
        super(props);
        this.state = {

        }

        this.CLIENT_ID = 'CLIENT_ID';
    }

    loginSpotify = async () => {
        let response = await fetch('https://accounts.spotify.com/authorize?client_id=' + this.CLIENT_ID + 
        '&redirect_uri=http://localhost:3000/&scope=user-read-private&response_type=token&state=authorize', {
            mode: 'cors'
        });

        let json = await response.json();

        console.log(json);
    }

    render(){
        return(
            <div className='login-content'>
                <Segment basic textAlign='center' className='login'>
                    <h1 className='login-title'>Every tempo you've searched, saved for your needs.</h1>
                    <Link to='/login'>
                        <Button className='login-button'>
                            LOGIN WITH EMAIL
                        </Button>
                    </Link>
                    <Button color='green' className='login-button' onClick={this.loginSpotify}>
                        <Icon name='spotify' inverted size='big'/> LOGIN WITH SPOTIFY    
                    </Button>
                </Segment>
            </div>
        )
    }
}
