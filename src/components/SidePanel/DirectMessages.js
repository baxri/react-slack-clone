import React, { Component } from 'react'
import { Menu, Icon } from "semantic-ui-react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setCurrentChanel, setPrivateChanel } from "../../actions/index";

class DirectMessages extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeChanel: '',
            user: this.props.user,
            users: [],
            usersRef: firebase.database().ref("users"),
            presenceRef: firebase.database().ref("presence"),
            connectedRef: firebase.database().ref(".info/connected"),
        }
    }

    componentDidMount() {
        if (this.state.user) {
            this.addListeners(this.state.user.uid);
        }
    }

    addListeners = uid => {
        let loadedUsers = [];

        this.state.usersRef.on("child_added", snap => {
            let user = snap.val();
            if (uid !== snap.key) {
                user['uid'] = snap.key;
                user['status'] = "offline";
                loadedUsers.push(user);
                this.setState({ users: loadedUsers });
            }
        });

        this.state.connectedRef.on("value", snap => {
            if (snap.val() === true) {
                const ref = this.state.presenceRef.child(uid);
                ref.set(true);

                ref.onDisconnect().remove(err => {
                    if (err !== null) {
                        console.log(err);
                    }
                })
            }
        });

        this.state.presenceRef.on("child_added", snap => {
            this.addStatusToUser(snap.key, true);
        });

        this.state.presenceRef.on("child_removed", snap => {
            this.addStatusToUser(snap.key, false);
        });
    };

    addStatusToUser = (userID, connected = true) => {
        const updatedUsers = this.state.users.map((user, key) => {

            if (user.uid === userID) {
                user['status'] = connected ? 'online' : 'offline';
            }

            return user;
        });

        this.setState({ users: updatedUsers });
    };

    changeChanel = user => {

        const channelId = this.getChanelId(user.uid);

        const channelData = {
            id: channelId,
            name: user.name,
        };

        this.props.setCurrentChanel(channelData);
        this.props.setPrivateChanel(true);
        this.setState({ activeChanel: user.uid });
    };

    getChanelId = userId => {
        const currentUserId = this.state.user.uid;
        return currentUserId > userId ? `${userId}/${currentUserId}` : `${currentUserId}/${userId}`;
    };

    isUserOnline = user => {
        return user.status === 'online';
    };

    isActive = user => {
        return user.uid === this.state.activeChanel;
    };

    render() {

        const { users, user } = this.state;

        return (
            <Menu.Menu className="menu" style={{ marginTop: '10px', }}>
                <Menu.Item>
                    <span>
                        <Icon name="mail" /> DIRECT MESSAGES
                    </span>{' '}
                    ({users.length})
                </Menu.Item>
                {users.map(user =>
                    <Menu.Item key={user.uid} active={this.isActive(user)} onClick={() => this.changeChanel(user)}>
                        <Icon name='circle'
                            color={this.isUserOnline(user) ? 'green' : 'red'}
                        />
                        @ {user.name}
                    </Menu.Item>
                )}
            </Menu.Menu>
        )
    }
}

export default connect(null, { setCurrentChanel, setPrivateChanel })(DirectMessages);

