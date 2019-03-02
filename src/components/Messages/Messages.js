import React, { Component } from 'react'
import { Segment, Comment } from "semantic-ui-react";

import firebase from "../../firebase";

import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";

export default class Messages extends Component {

    constructor(props) {
        super(props)

        this.state = {

            messagesRef: firebase.database().ref('messages'),
        }
    }


    render() {
        return (
            <React.Fragment>
                <MessageHeader />

                <Segment>
                    <Comment.Group className="messages">
                        {/* Messages */}
                    </Comment.Group>
                </Segment>

                <MessageForm messagesRef={this.state.messagesRef} />
            </React.Fragment>
        )
    }
}
