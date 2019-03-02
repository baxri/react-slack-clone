import React, { Component } from 'react'
import { connect } from "react-redux";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import firebase from "../../firebase";

class UserPanel extends Component {

    dropDownOptions = () => {

        const { user } = this.props;

        console.log(user);

        return [
            {
                key: "user",
                text: <span>Signed is as <strong>{user && user.displayName}</strong></span>,
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
    }

    handleSignOut = async () => {
        await firebase.auth().signOut();
    }

    render() {

        const { user } = this.props;


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
                                <Image src={user && user.photoURL} spaced="right" avatar />
                                {user && user.displayName}
                            </span>
                        } options={this.dropDownOptions()} />
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}


export default UserPanel;
