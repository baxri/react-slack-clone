import React, { Component } from 'react'
import { Menu, Icon, Modal, Form, Input, Button, Message } from "semantic-ui-react";
import firebase from "../../firebase";

export default class Chanels extends Component {

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

            chanelsRef: firebase.database().ref('chanels'),
        }
    }

    componentDidMount() {
        this.addListeners();
    }

    addListeners = () => {

        let chanels = [];

        this.state.chanelsRef.on('child_added', snap => {
            chanels.push(snap.val());
            this.setState({ chanels: chanels });
        })
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

    openModal = () => this.setState({ modal: true });
    closeModal = () => this.setState({ modal: false });

    render() {

        const { chanels, modal, error } = this.state;

        return (
            <React.Fragment>
                <Menu.Menu>
                    <Menu.Item>
                        <span>
                            <Icon name="exchange" />  CHANELS &nbsp;  ({chanels.length})
                        </span>
                        <Icon name="add" onClick={this.openModal} />
                    </Menu.Item>

                    {chanels.length > 0 && chanels.map(chanel => (<Menu.Item key={chanel.id}>
                        # {chanel.name}
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
