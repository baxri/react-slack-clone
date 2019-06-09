import React, { Component } from 'react'
import { Segment, Comment, Grid } from "semantic-ui-react";

import firebase from "../../firebase";

import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";
import Typeing from "./Typeing";
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
            typeingRef: firebase.database().ref('typeing'),
            privateMessagesRef: firebase.database().ref('privateMessages'),
            connectedRef: firebase.database().ref(".info/connected"),
            typeingUsers: [],
        }
    }

    componentDidMount() {
        const { user, chanel } = this.props;
        if (user && chanel) {
            this.addListeners(chanel);
            this.addTypeingListeners(chanel);
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
        })
    };

    addTypeingListeners = (chanel) => {
        let typeingUsers = [];

        const { user } = this.props;
        const { typeingRef, connectedRef } = this.state;

        typeingRef.child(chanel.id).on('child_added', snap => {
            // if (snap.key != user.uid) {
            typeingUsers = typeingUsers.concat({
                id: snap.key,
                name: snap.val(),
            });
            // }

            this.setState({ typeingUsers });
        })

        typeingRef.child(chanel.id).on('child_removed', snap => {

            const index = typeingUsers.findIndex(user => user.id === snap.key);

            if (index !== -1) {
                typeingUsers = typeingUsers.filter(user => user.id !== snap.key);
                this.setState({ typeingUsers });
            }
        })


        connectedRef.on('value', snap => {
            if (snap.val() === true) {
                typeingRef.child(chanel.id).child(user.uid).onDisconnect().remove();
            }
        });
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

    displayTypeingUsers = users => (
        users.length > 0 && users.map(user => (<div key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '2.0em', }}>
            <span className="user_typeing">{user.name} is typeing</span> <Typeing />
        </div>))
    )
    render() {

        const { messagesRef, messages, searchResult, searchTerm, searchLoader, isPrivateChanel, typeingUsers } = this.state;
        const { user, chanel, showSideBar, sideBarVisible } = this.props;

        const displayMessages = searchTerm.length > 0 ? searchResult : messages;

        return (
            <React.Fragment>
                <MessageHeader sideBarVisible={sideBarVisible} chanel={chanel} messages={messages} handleSearch={this.handleSearch} searchLoader={searchLoader} showSideBar={showSideBar} />

                <Segment className="messages-content">
                    <Comment.Group>
                        {displayMessages.length > 0 && displayMessages.map(message => (<Message key={message.timestamp} message={message} user={user} />))}
                    </Comment.Group>
                    {this.displayTypeingUsers(typeingUsers)}
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
