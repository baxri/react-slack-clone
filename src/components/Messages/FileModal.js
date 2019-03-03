import React, { Component } from 'react'
import { Modal, Input, Button, Icon } from "semantic-ui-react";

export default class FileModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            file: null,
        }
    }

    addFile = (e) => {
        const file = e.target.files;
        console.log(file)
    }

    render() {

        const { modal, closeModal } = this.props;

        return (
            <Modal open={modal} onClose={closeModal} >
                <Modal.Header>Select an image file</Modal.Header>

                <Modal.Content>
                    <Input fluid label="File type: jpg, png" name="file" type="file" />
                </Modal.Content>

                <Modal.Actions>
                    <Button color="red" inverted onClick={closeModal}>
                        <Icon name="remove" /> Send
                    </Button>
                    <Button color="green" inverted>
                        <Icon name="checkmark" /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
