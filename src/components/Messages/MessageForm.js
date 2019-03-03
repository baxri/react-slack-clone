import React, { Component } from 'react'
import { Segment, Button, Input, Message } from "semantic-ui-react";

import firebase from "../../firebase";

export default class MessageForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message: '',
            loading: false,
            error: '',
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    sendMessage = async () => {

        const { messagesRef, chanel, user } = this.props;
        const { message } = this.state;

        if (message) {

            this.setState({ loading: true, error: '' })

            try {

                const messageObject = {
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    content: message,
                    user: {
                        id: user.uid,
                        name: user.displayName,
                        avatar: user.photoURL,
                    }
                };

                await messagesRef.child(chanel.id).push().set(messageObject);

                this.setState({ message: '' })
            } catch (err) {
                this.setState({ error: err.message });
            } finally {
                this.setState({ loading: false })
            }
        }
    }

    render() {

        const { error, message, loading } = this.state;

        
        return (
            <Segment className="messages-form">
                {error && <Message error>
                    {error}
                </Message>}
                <Input
                    fluid
                    name="message"
                    label={<Button icon="send" onClick={this.sendMessage} disabled={(this.state.message.length < 3 || loading)} />}
                    onChange={this.handleChange}
                    labelPosition="right"
                    placeholder="Write your message here"
                    style={{ marginBottom: '1em' }}
                    value={message}
                />
                <Button.Group icon widths="2">
                    <Button
                        color="orange"
                        content="Add Reply"
                        labelPosition="left"
                        icon="edit"
                        onClick={this.sendMessage}
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
