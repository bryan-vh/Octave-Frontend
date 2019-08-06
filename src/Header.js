import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './Header.css';

const LeftHeader = () => {
    return (
        <div className='left-header'>
            <Link className='link' to='/'><h1 style={{fontWeight: 'bolder'}}>OCTAVE</h1></Link>
            {/* <Divider/> */}
            {/* <Link className='link' to='/saved'><h2>MY SONGS</h2></Link>
            <Divider/> */}
            {/* <Link className='link' to='/popular'><h2>POPULAR</h2></Link> */}
        </div>
    )
}

const RightHeader = (props) => {
    const {
        isLoading,
        onResultSelect,
        onSearchChange,
        results,
        value
    } = props;

    return (
        <div className='right-header'>
            <Search
                fluid
                loading={isLoading}
                className='search-bar'
                onResultSelect={onResultSelect}
                onSearchChange={onSearchChange}
                results={results}
                value={value}
            />
            {/* <div className='divider'></div>
            <Link className='link' to='/login'><h2>LOG IN</h2></Link> */}
        </div>
    );
}

// const Divider = () => {
//     return <div style={{width: '40px'}}/>
// }

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            results: [],
            value: '',
            token: null
        }
    }

    onResultSelect = (e, { result }) => {
        this.props.setIdToken(result.id, this.state.token);
    }

    onSearchChange = (e) => {
        let value = e.target.value;

        this.setState({
            value,
            isLoading: true,
            results: []
        }, () => {
            setTimeout(async () => {
                if(this.state.value.length > 0){
                    let response = await fetch('http://localhost:8080/search', {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            search: this.state.value
                        })
                    });
        
                    let json = await response.json();
                    let token = json.token;
                    let tracks = json.body.tracks;
                    let items = tracks.items;

                    let results = [];
    
                    for(let i = 0; i < items.length; i++){
                        let id = items[i].id;
                        results.push(await this.getSpotifyTrack(id, token));
                    }
    
                    this.setState({
                        isLoading: false,
                        results: results,
                        token: token
                    });
                }
                else{
                    return this.setState({
                        isLoading: false,
                        results: [],
                        value: ''
                    });
                }
            }, 500);  
        });             
    }

    getSpotifyTrack = async (id, token) => {
        let response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });

        let json = await response.json();

        let name = json.name;
        let image = json.album.images[0].url;
        let artists = json.artists;

        let artistNames = '';
        
        for(let i = 0; i < artists.length; i++){
            let artist = artists[i].name;

            if(i === artists.length - 1){
                artistNames += artist;
            }
            else {
                artistNames += (artist + ', ');
            }
        }

        let result = {
            title: name,
            image: image,
            description: artistNames,
            id: id,
            key: id
        };

        return result;
    }

    render(){
        const {
            isLoading,
            results,
            value
        } = this.state;

        return(
            <div className='main-header'>
                <LeftHeader/>
                <RightHeader
                    isLoading={isLoading}
                    onResultSelect={this.onResultSelect}
                    onSearchChange={this.onSearchChange}
                    results={results}
                    value={value}
                />
            </div>
        )
    }
}