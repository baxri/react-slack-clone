import React, { Component } from 'react'
import { Modal, Input, Button, Icon } from "semantic-ui-react";
import mime from "mime-types";

export default class FileModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            file: null,
            allowedFiles: ['image/jpeg', 'image/png']
        }
    }

    addFile = (e) => {

        const file = e.target.files[0];

        if (file) {
            this.setState({ file });
        }
    }

    sendFile = () => {

        const { file, allowedFiles } = this.state;
        const { uploadFile, closeModal } = this.props;

        if (file && allowedFiles.includes(mime.lookup(file.name))) {
            const metaData = { contentType: mime.lookup(file.name) };
            uploadFile(file, metaData);
            closeModal();

            this.setState({ file: null });
        }
    }

    render() {

        const { modal, closeModal } = this.props;

        return (
            <Modal open={modal} onClose={closeModal} >
                <Modal.Header>Select an image file</Modal.Header>

                <Modal.Content>
                    <Input fluid label="File type: jpg, png" name="file" type="file" onChange={this.addFile} />
                </Modal.Content>

                <Modal.Actions>
                    <Button color="red" inverted onClick={closeModal}>
                        <Icon name="remove" /> Cancel
                    </Button>
                    <Button color="green" inverted onClick={this.sendFile}>
                        <Icon name="checkmark" /> Send
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
