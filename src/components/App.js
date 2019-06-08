import React, {Component} from 'react';
import {connect} from "react-redux";
import {Grid} from "semantic-ui-react";
import './App.css';

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

class App extends Component {
    render() {

        const {user, chanel, isPrivateChanel} = this.props;

        return (
            <Grid stackable columns='equal'>

                <Grid>
                    <Grid.Column only='tablet computer'>
                        {user && <SidePanel user={user} className="sidepanel-col"/>}
                    </Grid.Column>
                </Grid>

                {/* <ColorPanel /> */}

                <Grid.Column className="messages-col">
                    {chanel &&
                    <Messages key={chanel.id} chanel={chanel} user={user} isPrivateChanel={isPrivateChanel}/>}
                </Grid.Column>

                <Grid>
                    <Grid.Column only='computer'>
                        <MetaPanel/>
                    </Grid.Column>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({user, chanel}) => ({
    user: user.currentUser,
    chanel: chanel.currentChanel,
    isPrivateChanel: chanel.isPrivateChanel,
});

export default connect(mapStateToProps)(App);
