import React, {Component} from 'react'
import {Menu, Icon} from "semantic-ui-react";
import firebase from "../../firebase";
import {connect} from "react-redux";
import {setCurrentChanel, setPrivateChanel} from "../../actions/index";

class DirectMessages extends Component {

    constructor(props) {
        super(props)

        this.state = {
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
            if (uid !== user.key) {
                user['uid'] = snap.key;
                user['status'] = "offline";
                loadedUsers.push(user);
                this.setState({users: loadedUsers});
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
            if (uid !== snap.key) {
                this.addStatusToUser(uid, true);
            }
        });

        this.state.presenceRef.on("child_removed", snap => {
            if (uid !== snap.key) {
                this.addStatusToUser(uid, false);
            }
        });
    };

    addStatusToUser = (userID, connected = true) => {
        const updatedUsers = this.state.users.reduce((acc, user) => {

            if (user.uid === userID) {
                user['tatus'] = connected ? 'online' : 'offline';
            }

            return acc.concat(user);
        }, []);

        this.setState({users: updatedUsers});
    };

    changeChanel = user => {

        const channelId = this.getChanelId(user.uid);

        console.log(channelId);

        const channelData = {
            id: channelId,
            name: user.name,
        };

        this.props.setCurrentChanel(channelData);
        this.props.setPrivateChanel(true);
    };

    getChanelId = userId => {
        const currentUserId = this.state.user.uid;
        return currentUserId > userId ? `${userId}/${currentUserId}` : `${currentUserId}/${userId}`;
    };

    isUserOnline = user => user.state === 'online';

    render() {

        const {users, user} = this.state;

        return (
            <Menu.Menu className="menu" style={{marginTop: '10px',}}>
                <Menu.Item>
                    <span>
                        <Icon name="mail"/> DIRECT MESSAGES
                    </span>{' '}
                    ({users.length})
                </Menu.Item>
                {users.map(user =>
                    <Menu.Item key={user.uid} onClick={() => this.changeChanel(user)}>
                        <Icon name='circle' color={this.isUserOnline(user) ? 'green' : 'red'}/>
                        @ {user.name}
                    </Menu.Item>
                )}
            </Menu.Menu>
        )
    }
}

export default connect(null, {setCurrentChanel, setPrivateChanel})(DirectMessages);

