import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Saved from './Saved';
import Email from './Email';
import Popular from './Popular';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            id: null,
            token: null
        }
    }

    setIdToken = (id, token) => {
        this.setState({ id, token });
    }

    setIdTokenNull = () => {
        this.setState({
            id: null,
            token: null
        });
    }

    render(){
        const { id, token } = this.state;

        return (
            <>
                <Header setIdToken={this.setIdToken}/>
                <Route 
                    exact 
                    path='/'
                    render={(props) => <Content {...props} id={id} token={token} setIdTokenNull={this.setIdTokenNull}/>}
                />
                <Route exact path='/saved' component={Saved}/>
                <Route path='/login' component={Email}/>
                <Route path='/popular' component={Popular}/>
                <Footer/>
            </>
        )
    }
}