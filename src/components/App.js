import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid, Image, Sidebar, Menu, Segment, Icon, Header, Button } from "semantic-ui-react";
import './App.css';

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

class App extends Component {

    state = { visible: false }

    handleHideClick = () => this.setState({ visible: false })
    handleShowClick = () => this.setState({ visible: true })
    handleSidebarHide = () => this.setState({ visible: false })

    render() {

        const { visible } = this.state

        const { user, chanel, isPrivateChanel } = this.props;

        return (<div>

            <Button.Group>
                <Button disabled={visible} onClick={this.handleShowClick}>
                    Show sidebar
          </Button>
                <Button disabled={!visible} onClick={this.handleHideClick}>
                    Hide sidebar
          </Button>
            </Button.Group>
            <Sidebar.Pushable as={Segment}>
                <Sidebar
                    animation='slide along'
                    icon='labeled'
                    onHide={this.handleSidebarHide}
                    visible={visible}>
                    {user && <SidePanel user={user} className="sidepanel-col" />}
                </Sidebar>
                <Sidebar.Pusher>
                    <Grid divided style={{ height: '100vh' }}>
                        <Grid.Column computer={11} tablet={16} mobile={16}>
                            {chanel &&
                                <Messages key={chanel.id} chanel={chanel} user={user} isPrivateChanel={isPrivateChanel} showSideBar={this.handleShowClick} />}
                        </Grid.Column>
                        <Grid.Column computer={5} only='computer'>
                            <MetaPanel />
                        </Grid.Column>
                    </Grid>
                </Sidebar.Pusher>
            </Sidebar.Pushable>

        </div>
        );
    }
}

const mapStateToProps = ({ user, chanel }) => ({
    user: user.currentUser,
    chanel: chanel.currentChanel,
    isPrivateChanel: chanel.isPrivateChanel,
});

export default connect(mapStateToProps)(App);
