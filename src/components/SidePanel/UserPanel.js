import React, { Component } from 'react'
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";
import firebase from "../../firebase";

export default class UserPanel extends Component {

    dropDownOptions = () => [
        {
            key: "user",
            text: <span>Signed is as <strong>User</strong></span>,
            disabled: true
        },
        {
            key: "avatar",
            text: <span>Change Avatar</span>,
        },
        {
            key: "signout",
            text: <span onClick={this.handleSignOut}>Sign Out</span>,
        }
    ]

    handleSignOut = async () => {
        await firebase.auth().signOut();
    }

    render() {
        return (
            <Grid>
                <Grid.Column>
                    <Grid.Row style={{ padding: '1.2em', margin: 0, }}>
                        <Header inverted as='h2' floated='left'>
                            <Icon name="code" />
                            <Header.Content>DevChat</Header.Content>
                        </Header>
                    </Grid.Row>



                    <Header style={{ padding: '0.25em' }} as="h4" inverted>
                        <Dropdown trigger={
                            <span>User</span>
                        } options={this.dropDownOptions()} />
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}
