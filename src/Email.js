import React, { Component } from 'react';
import { Segment, Grid, Form, Button, Divider } from 'semantic-ui-react';

import './Email.css';

export default class Email extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className='email-content'>
                <Segment placeholder className='email-segment'>
                    <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column verticalAlign='middle' className='grid-column'>
                            <Form>
                                <Form.Input label='Email' placeholder='Email' icon='user' iconPosition='left'/>
                                <Form.Input label='Password' placeholder='Password' icon='lock' iconPosition='left' type='password'/>
                                <Button color='blue' className='email-login-button' content='LOG IN'/>
                            </Form>
                        </Grid.Column>
                        <Grid.Column verticalAlign='middle' className='grid-column'>
                            <Form>
                                <Form.Input label='Email' placeholder='Email' icon='user' iconPosition='left'/>
                                <Form.Input label='Password' placeholder='Password' icon='lock' iconPosition='left' type='password'/>
                                <Form.Input label='Confirm Password' placeholder='Confirm Password' icon='lock' iconPosition='left' type='password'/>
                                <Button color='green' className='register-button' content='REGISTER'/>
                            </Form>
                        </Grid.Column>
                    </Grid>
                    <Divider className='email-divider' vertical>Or</Divider>
                </Segment>
            </div>
        )
    }
}