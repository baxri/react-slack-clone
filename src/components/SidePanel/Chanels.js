import React, { Component } from 'react'
import { connect } from "react-redux";
import { Menu, Icon, Modal, Form, Input, Button, Message, Grid, Dimmer, Image, Segment, Label } from "semantic-ui-react";
import firebase from "../../firebase";
import { setCurrentChanel, setPrivateChanel } from "../../actions/index";

class Chanels extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: this.props.user,
            chanelName: '',
            chanelDetails: '',
            chanels: [],
            modal: false,
            error: '',
            loading: false,
            chanelsLoading: true,
            firstLoad: true,

            chanelsRef: firebase.database().ref('chanels'),
            messagesRef: firebase.database().ref('messages'),

            notifications: [],
        }
    }

    componentDidMount() {
        this.addListeners();
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    addListeners = () => {

        let chanels = [];

        this.state.chanelsRef.on('child_added', snap => {
            chanels.push(snap.val());
            this.setState({ chanels: chanels, chanelsLoading: false }, () => this.setDefaultChanel());
            this.addNotificationListener(snap.key);
        })
    }

    addNotificationListener = (chanelID) => {
        this.state.messagesRef.child(chanelID).on('value', snap => {
            this.handleNotifications(chanelID, snap);
        })
    }

    handleNotifications = (chanelID, snap) => {

        const { notifications } = this.state;
        const { chanel } = this.props;

        if (notifications[chanelID]) {
            if (chanel.id !== chanelID) {
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


        console.log("before state");
        this.setState({ notifications });
        console.log("after state");


    }

    removeListeners = () => {
        this.state.chanelsRef.off();
        this.state.messagesRef.off();
    }

    setDefaultChanel = () => {

        if (this.state.firstLoad && this.state.chanels.length > 0) {
            this.props.setCurrentChanel(this.state.chanels[0]);
            this.props.setPrivateChanel(false);
        }

        this.setState({ firstLoad: false });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const { chanelName, chanelDetails, chanelsRef, user } = this.state;

            if (!chanelName) {
                throw new Error('ChanelName Not defined!');
            }

            if (!chanelDetails) {
                throw new Error('ChanelDetails Not defined!');
            }

            this.setState({ loading: true, error: '' });

            const key = await chanelsRef.push().key;

            const newChanel = {
                id: key,
                name: chanelName,
                details: chanelDetails,
                createdBy: {
                    name: user.displayName,
                    avatar: user.photoURL,
                }
            };

            await chanelsRef.child(key).update(newChanel);

            this.closeModal();
            this.setState({ loading: false, error: '', chanelName: '', chanelDetails: '' });
        } catch (err) {
            this.setState({ loading: false, error: err.message });
        }

    }

    handleInputError = (input) => {
        return this.state.error.toLowerCase().indexOf(input.toLowerCase()) > -1;
    }

    changeChanel = chanel => {
        this.props.setCurrentChanel(chanel);
        this.props.setPrivateChanel(false);
        this.setState({ chanel });
        this.clearNotifications(chanel.id);
    }

    openModal = () => this.setState({ modal: true });
    closeModal = () => this.setState({ modal: false });

    getNotifications = chanelId => {

        const { notifications } = this.state;

        if (notifications[chanelId] && notifications[chanelId].unreadMessages > 0) {
            return <Label color="red">{notifications[chanelId].unreadMessages}</Label>;
        }

        return null;
    }

    clearNotifications = chanelId => {

        const { notifications } = this.state;

        if (notifications[chanelId]) {
            notifications[chanelId].unreadMessages = 0;
            notifications[chanelId].messages = notifications[chanelId].latestMessages;
            this.setState({ notifications });
        }
    }

    render() {

        const { chanels, modal, error } = this.state;
        const { chanel } = this.props;

        return (
            <React.Fragment>
                <Menu.Menu>
                    <Menu.Item>
                        <span>
                            <Icon name="exchange" />  CHANELS &nbsp;  ({chanels.length})
                        </span>
                        <Icon name="add" onClick={this.openModal} />
                    </Menu.Item>

                    {chanels.length > 0 && chanels.map(item => (<Menu.Item active={item == chanel} key={item.id} onClick={() => this.changeChanel(item)}>
                        # {item.name} {this.getNotifications(item.id)}
                    </Menu.Item>))}

                    <Modal open={modal} onClose={this.closeModal}>
                        <Modal.Header>
                            Add Chanel
                    </Modal.Header>
                        <Modal.Content>

                            {error && <Message error>
                                <Message.Content>
                                    {error}
                                </Message.Content>
                            </Message>}

                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <Input error={this.handleInputError("chanelName")} name="chanelName" fluid placeholder="Name Of Chanel" onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field>
                                    <Input error={this.handleInputError("chanelDetails")} name="chanelDetails" fluid placeholder="About the Chanel" onChange={this.handleChange} />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color="red" inverted onClick={this.closeModal}>
                                <Icon name="remove" /> Cancel
                        </Button>
                            <Button color="green" inverted onClick={this.handleSubmit}>
                                <Icon name="checkmark" /> Add
                        </Button>
                        </Modal.Actions>
                    </Modal>
                </Menu.Menu>
            </React.Fragment>
        )
    }
}


const mapStateToProps = ({ chanel }) => ({
    chanel: chanel.currentChanel
})

export default connect(mapStateToProps, { setCurrentChanel, setPrivateChanel })(Chanels);
