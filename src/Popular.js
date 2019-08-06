import React, { Component } from 'react';
import { Item, Divider } from 'semantic-ui-react';

import './Popular.css';

export default class Popular extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className='popular-content'>
                <div className='popular'>
                    <h1 className='popular-title'>Top 100</h1>
                    <Divider className='popular-divider'/>
                    <Item.Group divided>
                        <Item className='song-item'>
                            <h1>1</h1>
                            <Item.Image/>
                            <Item.Content className='item-content'>
                                <Item.Header className='item-header'>Song</Item.Header>
                                <Item.Meta className='item-meta'>Artist</Item.Meta>
                                <Item.Meta className='item-meta'>BPM</Item.Meta>
                            </Item.Content>
                        </Item>
                        <Item className='song-item'>
                            <h1>2</h1>
                            <Item.Image/>
                            <Item.Content className='item-content'>
                                <Item.Header className='item-header'>Song</Item.Header>
                                <Item.Meta className='item-meta'>Artist</Item.Meta>
                                <Item.Meta className='item-meta'>BPM</Item.Meta>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </div>
            </div>
        )
    }
}