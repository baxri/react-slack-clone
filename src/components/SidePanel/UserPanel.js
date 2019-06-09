import React, { Component } from 'react'
import { Grid, Header, Icon, Dropdown, Image, Modal, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase";
import AvatarEditor from 'react-avatar-editor';

class UserPanel extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: this.props.user,
            modal: false,
            previewImage: null,
            cropedImage: null,
            blob: null,

            storageRef: firebase.storage().ref(),
            userRef: firebase.auth().currentUser,
            usersRef: firebase.database().ref('users'),
            metadata: {
                contentType: 'image/jpeg'
            },
            downloadedUrl: null,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ user: nextProps.user });
    }

    openModal = () => this.setState({ modal: true });
    closeModal = () => this.setState({ modal: false });

    dropDownOptions = () => {

        const { user } = this.state;

        return [
            {
                key: "user",
                text: <span>Signed is as <strong>{user.displayName}</strong></span>,
                disabled: true
            },
            {
                key: "avatar",
                text: <span onClick={this.openModal}>Change Avatar</span>,
            },
            {
                key: "signout",
                text: <span onClick={this.handleSignOut}>Sign Out</span>,
            }
        ]
    }

    handleSignOut = async () => {
        await firebase.auth().signOut();
    }

    handleChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                this.setState({ previewImage: reader.result });
            });
        }

    }

    handleCropImage = () => {
        if (this.avatarEditor) {
            this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
                let imageUrl = URL.createObjectURL(blob);
                this.setState({
                    cropedImage: imageUrl,
                    blob,
                });
            });
        }
    }

    handleFileUpload = () => {
        const { storageRef, user, blob, metadata } = this.state;

        storageRef.child(`avatars/user-${user.uid}`).put(blob, metadata).then(snap => {
            snap.ref.getDownloadURL().then(downloadedUrl => {
                this.setState({ downloadedUrl }, () => this.changeAvatar());
            });
        });
    }

    changeAvatar = () => {

        const { user, userRef, usersRef, downloadedUrl } = this.state;

        userRef.updateProfile({
            photoURL: downloadedUrl
        }).then(() => {
            usersRef.child(user.uid).update({
                avatar: downloadedUrl
            }).then(() => {
                this.closeModal();
            });
        });
    }

    render() {

        const { user, modal, previewImage, cropedImage } = this.state;


        return (
            <Grid>
                <Grid.Column>
                    <Grid.Row style={{ padding: '1em', margin: 0, }}>
                        <Header inverted as='h2' floated='left'>
                            <Icon name="code" />
                            <Header.Content>DevChat</Header.Content>
                        </Header>
                    </Grid.Row>


                    <Header style={{ padding: '1em' }} as="h4" inverted>
                        <Dropdown trigger={
                            <span>
                                <Image src={user.photoURL} spaced="right" avatar />
                                {user.displayName}
                            </span>
                        } options={this.dropDownOptions()} />
                    </Header>
                </Grid.Column>


                <Modal basic open={modal} onClose={this.closeModal}>
                    <Modal.Header>Change Avatar</Modal.Header>
                    <Modal.Content>
                        <Input fluid type="file" label="New Avatar" name="previewImage" onChange={this.handleChange} />
                        <Grid centered stackable columns={2}>
                            <Grid.Row centered>
                                <Grid.Column className="">
                                    {previewImage && <AvatarEditor ref={node => (this.avatarEditor = node)} image={previewImage} width={120} height={120} border={50} scale={1.2} />}
                                </Grid.Column>
                                <Grid.Column className="">
                                    {cropedImage && <Image style={{ margin: '3.5em auto' }} width={100} height={100} src={cropedImage} />}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        {cropedImage && <Button color="green" inverted onClick={this.handleFileUpload}>
                            <Icon name="save" /> Change Avatar
                        </Button>}
                        <Button color="green" inverted onClick={this.handleCropImage}>
                            <Icon name="image" /> Preview
                        </Button>
                        <Button color="red" inverted onClick={this.closeModal}>
                            <Icon name="remove" /> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Grid>
        )
    }
}


export default UserPanel;
