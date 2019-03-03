import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import './App.css';

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

class App extends Component {
  render() {

    const { user, chanel } = this.props;

    return (
      <Grid columns="equal" stackable >

        <Grid >
          <Grid.Column only='tablet computer'>
            {user && <SidePanel user={user} className="sidepanel-col" />}
          </Grid.Column>
        </Grid>

        {/* <ColorPanel /> */}

        <Grid.Column className="messages-col" >
          {chanel && <Messages key={chanel.id} chanel={chanel} user={user} />}
        </Grid.Column>

        <Grid >
          <Grid.Column only='tablet computer'>
            <MetaPanel />
          </Grid.Column>
        </Grid>

      </Grid >
    );
  }
}

const mapStateToProps = ({ user, chanel }) => ({
  user: user.currentUser,
  chanel: chanel.currentChanel,
})

export default connect(mapStateToProps)(App);
