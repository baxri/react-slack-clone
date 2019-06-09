import React, { Component } from 'react'
import { Segment, Comment, Grid } from "semantic-ui-react";

import firebase from "../../firebase";

import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";
import { connect } from 'react-redux';
import { setMessages, setUserPosts } from '../../actions/index';


class Messages extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isPrivateChanel: this.props.isPrivateChanel,
            messages: [],
            searchResult: [],
            searchLoader: false,
            searchTerm: '',
            messagesRef: firebase.database().ref('messages'),
            privateMessagesRef: firebase.database().ref('privateMessages'),
        }
    }

    componentDidMount() {
        const { user, chanel } = this.props;
        if (user && chanel) {
            this.addListeners(chanel);
        }
    }

    getMessagesRef = () => {
        const { messagesRef, privateMessagesRef, isPrivateChanel } = this.state;
        return isPrivateChanel ? privateMessagesRef : messagesRef;
    };

    addListeners = (chanel) => {

        let messages = [];

        const messagesRef = this.getMessagesRef();

        messagesRef.child(chanel.id).on('child_added', snap => {
            messages.push(snap.val());
            this.setState({ messages: messages });
            this.props.setMessages(messages);
        })
    };

    handleSearch = (e) => {

        const searchTerm = e.target.value.toLowerCase();
        this.setState({ searchTerm: searchTerm, searchLoader: true });
        const messages = [...this.state.messages];
        const searchResult = messages.reduce((acc, message) => {
            if (message.content && message.content.toLowerCase().indexOf(searchTerm) > -1) {
                acc.push(message);
            }
            return acc;
        }, []);

        this.setState({ searchResult, searchLoader: false });
    };

    render() {

        const { messagesRef, messages, searchResult, searchTerm, searchLoader, isPrivateChanel } = this.state;
        const { user, chanel, showSideBar, sideBarVisible } = this.props;

        const displayMessages = searchTerm.length > 0 ? searchResult : messages;

        return (
            <React.Fragment>
                <MessageHeader sideBarVisible={sideBarVisible} chanel={chanel} messages={messages} handleSearch={this.handleSearch} searchLoader={searchLoader} showSideBar={showSideBar} />

                <Segment className="messages-content">
                    <Comment.Group>
                        {displayMessages.length > 0 && displayMessages.map(message => (<Message key={message.timestamp} message={message} user={user} />))}
                    </Comment.Group>
                </Segment>

                <MessageForm messagesRef={messagesRef} chanel={chanel} user={user} isPrivateChanel={isPrivateChanel} getMessagesRef={this.getMessagesRef} />

            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ chanel }) => ({
    messages: chanel.messages,
});

export default connect(mapStateToProps, { setMessages, setUserPosts })(Messages);
