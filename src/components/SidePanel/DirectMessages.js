import React, { Component } from 'react'
import { Menu, Icon, Label } from "semantic-ui-react";
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
            messagesRef: firebase.database().ref('privateMessages'),

            notifications: [],
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
                user['id'] = this.getChanelId(snap.key);
                user['uid'] = snap.key;
                user['status'] = "offline";
                loadedUsers.push(user);
                this.setState({ users: loadedUsers });
                this.addNotificationListener(user.id);
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

    addNotificationListener = (chanelID) => {
        this.state.messagesRef.child(chanelID).on('value', snap => {
            this.handleNotifications(chanelID, snap);
        })
    }

    handleNotifications = (chanelID, snap) => {

        const { notifications, activeChanel } = this.state;

        const activeChanelID = this.getChanelId(activeChanel);

        if (notifications[chanelID]) {
            if (activeChanelID !== chanelID) {
                let lastTotalMessages = notifications[chanelID].messages;

                if (snap.numChildren() - lastTotalMessages > 0) {
                    notifications[chanelID] = {
                        messages: lastTotalMessages,
                        unreadMessages: snap.numChildren() - lastTotalMessages,
                        latestMessages: snap.numChildren(),
                    };
                }
            } else {
                notifications[chanelID] = {
                    messages: snap.numChildren(),
                    latestMessages: snap.numChildren(),
                    unreadMessages: 0,
                };
            }
        } else {
            notifications[chanelID] = {
                messages: snap.numChildren(),
                latestMessages: snap.numChildren(),
                unreadMessages: 0,
            };
        }

        this.setState({ notifications });
    }

    getNotifications = userId => {

        const { notifications } = this.state;

        let chanelId = this.getChanelId(userId);

        if (notifications[chanelId] && notifications[chanelId].unreadMessages > 0) {
            return <Label color="red">{notifications[chanelId].unreadMessages}</Label>;
        }

        return null;
    }

    clearNotifications = userId => {

        const { notifications } = this.state;

        let chanelId = this.getChanelId(userId);

        if (notifications[chanelId]) {
            notifications[chanelId].unreadMessages = 0;
            notifications[chanelId].messages = notifications[chanelId].latestMessages;
            this.setState({ notifications });
        }
    }

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
        this.clearNotifications(user.uid);
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
                        @ {user.name} {this.getNotifications(user.uid)}
                    </Menu.Item>
                )}
            </Menu.Menu>
        )
    }
}

export default connect(null, { setCurrentChanel, setPrivateChanel })(DirectMessages);

