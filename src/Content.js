import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import { Palette } from 'react-palette';

import SongDetails from './components/SongDetails';
import PlayButton from './components/PlayButton';
import CancelButton from './components/CancelButton';
import MainContent from './components/MainContent';

import './Content.css';


export default class Content extends Component {
    constructor(props){
        super(props);

        this.state = {
            gotSong: false,
            title: null,
            artist: null,
            lyrics: null,
            preview: null,
            image: null,
            tempo: null,
            duration: null,
            play: false,
            recording: 'ready',
            visible: false
        }
    }

    componentDidMount(){
        const { id, token } = this.props; 

        if(id != null && token != null){
            this.getSpotifyTrack(id, token);
        }
    }

    componentDidUpdate(prevProps, prevState){
        const { id, token } = this.props;

        if(prevProps.id !== id && prevProps.token !== token){
            if(id != null && token != null){
                this.getSpotifyTrack(id, token);
            }
            else {
                this.setState({
                    gotSong: false
                })
            }
        }
    }

    togglePlay = () => {
        this.setState({
            play: !this.state.play
        }, () => {
            this.state.play ? this.player.play() : this.player.pause();
        });
    }

    recordAudio = async () => {
        let stream = null;
        let chunks = [];

        this.setState({
            recording: 'listening'
        });

        this.setState({
            visible: !this.state.visible
        });

        try {
            /* Record from the mic */
            stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false});

            console.log(stream);

            let mediaRecorder = new MediaRecorder(stream);
            
            mediaRecorder.start();
            await new Promise(resolve => setTimeout(resolve, 5000));
            mediaRecorder.stop();
            
            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data);
            }

            mediaRecorder.onstop = async (e) => {
                let blob = new Blob(chunks, {type: 'audio/mp3;'});
                let data = new FormData();

                data.append('audio', blob, 'recording.mp3');

                let url = 'http://127.0.0.1:8080/upload';

                let response = await fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'enctype': 'multipart/form-data'
                    },
                    body: data
                });

                let json = await response.json();
                let audioUrl = 'https://888ead81.ngrok.io/' + json.file.filename;
                console.log(audioUrl);
                this.getSongFromRecording(audioUrl);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    getSongFromRecording = async (url) => {
        this.setState({
            recording: 'sending'
        });

        let response = await fetch('https://api.audd.io/?url=' + url + '&return=lyrics&api_token=9dac475bbbd39707d35dc6ab1eb6d41e');
        let json = await response.json();

        let title = json.result.title;
        let artist = json.result.artist;

        console.log(title);
        console.log(artist);

        if(title.includes(' (feat. ')){
            console.log(title);
            title = title.substring(0, title.indexOf(' (feat. '));
            console.log(title);
        }
        else if(title.includes(' feat. ')){
            console.log(title);
            title = title.substring(0, title.indexOf(' feat. '));
            console.log(title);
        }
        
        if(artist.includes(' (feat. ')){
            console.log(artist);
            artist = artist.substring(0, artist.indexOf(' (feat. '));
            console.log(artist);
        }
        else if(artist.includes(' feat. ')){
            console.log(artist);
            artist = artist.substring(0, artist.indexOf(' feat. '));
            console.log(artist);
        }

        this.getSongIdFromSpotifySearch(title, artist);
    }

    getSongIdFromSpotifySearch = async (title, artist) => {
        let response = await fetch('http://localhost:8080/song', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                artist: artist
            })
        });

        let json = await response.json();

        let token = json.token;
        let tracks = json.body.tracks;
        let items = tracks.items;
        let track = items[0];

        let id = track.id;

        this.getSpotifyTrack(id, token);
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
        let preview = json.preview_url;
        let artists = json.artists;
        let image = json.album.images[0].url;

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

        this.setState({
            title: name,
            artist: artistNames,
            preview: preview,
            image: image
        });

        this.getSpotifyTrackFeatures(id, token);
    }

    getSpotifyTrackFeatures = async (id, token) => {
        let response = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });
        let json = await response.json();

        let tempo = Math.round(json.tempo);
        let millis = json.duration_ms;

        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);

        if(seconds === 60){
            minutes += 1;
            seconds = 0;
        }

        let duration = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

        this.setState({
            tempo: tempo,
            duration: duration,
            gotSong: true
        });
    }

    cancelClick = () => {
        this.setState({
            gotSong: !this.state.gotSong,
            recording: 'ready',
            play: false
        }, () => {
            this.props.setIdTokenNull();
        });
    }

    onSongEnd = () => {
        this.setState({
            play: false
        });
    }

    render(){
        const {
            // tries,
            recording,
            visible,
            title,
            duration,
            tempo,
            artist,
            play,
            preview
        } = this.state;

        return (
            <>
                {(this.state.gotSong) ? (
                    <Palette src={this.state.image}>
                        {({data}) => (
                            <div className='song-content' style={{
                                backgroundImage: 'linear-gradient(' + data.lightVibrant + ',' + data.darkMuted + ')'
                            }}>
                                <CancelButton onClick={this.cancelClick}/>
                                <div className='song-container'>
                                    <Image src={this.state.image} size='big' rounded/>
                                    <div className='divider'/>
                                    <div className='song-info'>
                                        <SongDetails title={title} artist={artist} duration={duration} tempo={tempo}/>
                                        <PlayButton togglePlay={this.togglePlay} play={play} preview={preview}/>
                                    </div>
                                </div>
                                <audio onEnded={this.onSongEnd} ref={ref => this.player = ref} src={preview}/>
                            </div>
                        )}
                    </Palette>
                ) : (
                    <MainContent recordAudio={this.recordAudio} recording={recording} visible={visible}/>
                )}
            </>
        )
    }
}