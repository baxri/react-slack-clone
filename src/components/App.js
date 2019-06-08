import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid, Image, Sidebar } from "semantic-ui-react";
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

            <Sidebar.Pushable as={Segment}>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={visible}
                    width='thin'
                >
                    <Menu.Item as='a'>
                        <Icon name='home' />
                        Home
            </Menu.Item>
                    <Menu.Item as='a'>
                        <Icon name='gamepad' />
                        Games
            </Menu.Item>
                    <Menu.Item as='a'>
                        <Icon name='camera' />
                        Channels
            </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher>
                    <Segment basic>
                        <Header as='h3'>Application Content</Header>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>

            <Grid divided style={{ height: '100vh' }}>
                <Grid.Column computer={3} tablet={4} only='tablet computer'>
                    {user && <SidePanel user={user} className="sidepanel-col" />}
                </Grid.Column>
                <Grid.Column computer={8} tablet={12} mobile={16}>
                    {chanel &&
                        <Messages key={chanel.id} chanel={chanel} user={user} isPrivateChanel={isPrivateChanel} />}
                </Grid.Column>
                <Grid.Column computer={5} only='computer'>
                    <MetaPanel />
                </Grid.Column>
            </Grid>
        </div>
            // <Grid stackable columns='equal'>

            //     <Grid>
            //         <Grid.Column only='tablet computer'>
            //             {user && <SidePanel user={user} className="sidepanel-col"/>}
            //         </Grid.Column>
            //     </Grid>

            //     {/* <ColorPanel /> */}

            //     <Grid.Column className="messages-col">
            //         {chanel &&
            //         <Messages key={chanel.id} chanel={chanel} user={user} isPrivateChanel={isPrivateChanel}/>}
            //     </Grid.Column>

            //     <Grid>
            //         <Grid.Column only='computer'>
            //             <MetaPanel/>
            //         </Grid.Column>
            //     </Grid>
            // </Grid>
        );
    }
}

const mapStateToProps = ({ user, chanel }) => ({
    user: user.currentUser,
    chanel: chanel.currentChanel,
    isPrivateChanel: chanel.isPrivateChanel,
});

export default connect(mapStateToProps)(App);
