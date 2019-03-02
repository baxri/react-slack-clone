import React, { Component } from 'react'
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import firebase from "../../firebase";

class UserPanel extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: this.props.user,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ user: nextProps.user });
    }


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

        const { user } = this.state;


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
            </Grid>
        )
    }
}


export default UserPanel;
