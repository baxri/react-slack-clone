import React, { Component } from 'react'
import uuidV4 from "uuid/v4";
import { Segment, Button, Input, Message } from "semantic-ui-react";
import firebase from "../../firebase";
import FileModal from "./FileModal";
import ProgresBar from "./ProgresBar";



export default class MessageForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isPrivateChanel: this.props.isPrivateChanel,
            storageRef: firebase.storage().ref(),
            prcentUploaded: 0,
            uploadTask: null,
            uploadState: 0,

            message: '',
            loading: false,
            error: '',
            modal: false,
            typeingRef: firebase.database().ref('typeing'),
        }
    }

    async componentWillReceiveProps() {
        const { chanel, user } = this.props;
        const { typeingRef } = this.state;
        await typeingRef.child(chanel.id).child(user.uid).remove();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    openModal = () => {
        this.setState({ modal: true });
    };

    closeModal = () => {
        this.setState({ modal: false });
    };

    uploadFile = (file, metadata) => {

        const { chanel, user, isPrivateChanel } = this.props;

        const messagesRef = this.props.getMessagesRef();

        let path = `chat/public`;

        if (isPrivateChanel) {
            path = `chat/private-${chanel.id}`;
        }

        const filePath = `${path}/${uuidV4()}.jpg`;

        this.setState({
            uploadState: 1,
            uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
        }, () => {

            this.state.uploadTask.on('state_changed', snap => {

                const prcentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                this.setState({ prcentUploaded });
            }, err => {
                this.setState({ error: err, uploadState: 0, uploadTask: null });
            },
                () => {
                    this.state.uploadTask.snapshot.ref.getDownloadURL().then(downloadedURL => {

                        const messageObject = {
                            timestamp: firebase.database.ServerValue.TIMESTAMP,
                            image: downloadedURL,
                            user: {
                                id: user.uid,
                                name: user.displayName,
                                avatar: user.photoURL,
                            }
                        };

                        messagesRef.child(chanel.id).push().set(messageObject).then(data => {
                            this.setState({ uploadState: 0, });
                        }).catch(err => {
                            this.setState({ error: err.message })
                        });

                    }).catch(err => {
                        this.setState({ error: err, uploadState: 0, uploadTask: null });
                    })
                }
            );


        });
    }


    sendMessage = async () => {

        const { chanel, user } = this.props;
        const { message, typeingRef } = this.state;

        const messagesRef = this.props.getMessagesRef();

        if (message) {

            this.setState({ loading: true, error: '' })

            try {

                const messageObject = {
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    content: message,
                    user: {
                        id: user.uid,
                        name: user.displayName,
                        avatar: user.photoURL,
                    }
                };

                await messagesRef.child(chanel.id).push().set(messageObject);
                await typeingRef.child(chanel.id).child(user.uid).remove();

                this.setState({ message: '' })
            } catch (err) {
                this.setState({ error: err.message });
            } finally {
                this.setState({ loading: false })
            }
        }
    }

    handleTypeing = () => {

        const { chanel, user } = this.props;
        const { message, typeingRef } = this.state;

        if (message) {
            typeingRef.child(chanel.id).child(user.uid).set(user.displayName);
        } else {
            typeingRef.child(chanel.id).child(user.uid).remove();
        }
    }

    render() {

        const { error, message, loading, modal, uploadState, prcentUploaded } = this.state;

        return (
            <Segment className="messages-form">
                {error && <Message error>
                    {error}
                </Message>}
                <Input
                    fluid
                    name="message"
                    label={<Button icon="send" onClick={this.sendMessage}
                        disabled={(this.state.message.length < 3 || loading)} />}
                    onChange={this.handleChange}
                    onKeyUp={this.handleTypeing}
                    labelPosition="right"
                    placeholder="Write your message here"
                    style={{ marginBottom: '1em' }}
                    value={message}
                />
                <Button.Group icon widths="2">
                    <Button
                        color="orange"
                        content="Add Reply"
                        labelPosition="left"
                        icon="edit"
                        onClick={this.sendMessage}
                    />
                    <Button
                        color="teal"
                        content="Upload Media"
                        labelPosition="right"
                        icon="cloud upload"
                        disabled={uploadState > 0}
                        onClick={this.openModal}
                    />

                    <FileModal modal={modal} closeModal={this.closeModal} uploadFile={this.uploadFile} />

                </Button.Group>
                <ProgresBar prcentUploaded={prcentUploaded} state={uploadState} />
            </Segment>
        )
    }
}
