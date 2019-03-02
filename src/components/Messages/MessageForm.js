import React, { Component } from 'react'
import { Segment, Button, Input } from "semantic-ui-react";

export default class MessageForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    sendMessage = () => {

        const { messagesRef } = this.props;
        const { message } = this.state;

        if (message) {

        }

        console.log(messagesRef)
    }

    render() {
        return (
            <Segment className="message-form">
                <Input
                    fluid
                    name="message"
                    label={<Button icon="send" onClick={this.sendMessage} disabled={(this.state.message.length < 3)} />}
                    onChange={this.handleChange}
                    labelPosition="right"
                    placeholder="Write your message here"
                    style={{ marginBottom: '1em' }}
                />
                <Button.Group icon widths="2">
                    <Button
                        color="orange"
                        content="Add Reply"
                        labelPosition="left"
                        icon="edit"
                    />
                    <Button
                        color="teal"
                        content="Upload Media"
                        labelPosition="right"
                        icon="cloud upload"
                    />


                </Button.Group>
            </Segment>
        )
    }
}
