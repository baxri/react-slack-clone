import React, { Component } from 'react'
import { Segment, Comment, Grid } from "semantic-ui-react";

import firebase from "../../firebase";

import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";


export default class Messages extends Component {

    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            messagesRef: firebase.database().ref('messages'),
        }
    }

    componentDidMount() {

        const { user, chanel } = this.props;
        if (user && chanel) {
            console.log('very good')
            this.addListeners(chanel);
        }
    }

    addListeners = (chanel) => {

        let messages = [];

        const { messagesRef } = this.state;


        messagesRef.child(chanel.id).on('child_added', snap => {
            messages.push(snap.val());
            this.setState({ messages: messages });
        })
    }

    render() {

        const { messagesRef, messages } = this.state;
        const { user, chanel } = this.props;

        return (
            <React.Fragment>
                <MessageHeader key={chanel && chanel.id} chanel={this.props.chanel} messages={messages} />

                <Segment className="messages-content">
                    <Comment.Group>
                        {messages.length > 0 && messages.map(message => (<Message key={message.timestamp} message={message} user={user} />))}
                    </Comment.Group>
                </Segment>

                <MessageForm messagesRef={messagesRef} chanel={chanel} user={user} />

            </React.Fragment>
        )
    }
}
