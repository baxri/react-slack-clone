import React, { Component } from 'react'
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

export default class Chanels extends Component {

    constructor(props) {
        super(props)

        this.state = {
            chanelName: '',
            chanelDetails: '',
            chanels: [],
            modal: false,
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    openModal = () => this.setState({ modal: true });
    closeModal = () => this.setState({ modal: false });

    render() {

        const { chanels, modal } = this.state;

        return (
            <Menu.Menu>
                <Menu.Item>
                    <span>
                        <Icon name="exchange" /> CHANELS
                    </span>
                    {chanels.length} <Icon name="add" />
                </Menu.Item>


                <Modal open={modal} onClose={this.closeModal}>
                    <Modal.Header>
                        Add Chanel
                    </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <Input name="chanelName" fluid placeholder="Name Of Chanel" onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <Input name="chanelDetails" fluid placeholder="About the Chanel" onChange={this.handleChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="green" inverted>
                            <Icon name="checkmark" onClick={this.openModal} /> Add
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Menu.Menu>
        )
    }
}
