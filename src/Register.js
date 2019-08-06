import React, {Component} from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

import './Register.css';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className='register-content'>
                <Segment placeholder className='register-segment'>
                    <Form>
                        <Form.Input label='Email' placeholder='Email' icon='user' iconPosition='left'/>
                        <Form.Input label='Password' placeholder='Password' icon='lock' iconPosition='left' type='password'/>
                        <Form.Input label='Confirm Password' placeholder='Confirm Password' icon='lock' iconPosition='left' type='password'/>
                        <Button className='register-button' content='REGISTER'/>
                    </Form>
                </Segment>
            </div>
        )
    }
}