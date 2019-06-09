import React, { Component } from 'react'
import { Grid, Header, Icon, Dropdown, Image, Modal, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase";

class UserPanel extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: this.props.user,
            modal: false,
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

    render() {

        const { user, modal } = this.state;


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
                        <Input fluid type="file" label="New Avatar" name="previewImage" />
                        <Grid centered stackable columns={2}>
                            <Grid.Row centered>
                                <Grid.Column className="">

                                </Grid.Column>
                                <Grid.Column className="">

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="green" inverted>
                            <Icon name="save" /> Change Avatar
                        </Button>
                        <Button color="green" inverted>
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
