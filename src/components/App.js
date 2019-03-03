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
      <Grid columns="equal">

        <SidePanel key={user && user.id} user={user} className="sidepanel-col" />
        {/* <ColorPanel /> */}

        <Grid.Column className="messages-col">
          <Messages key={chanel && chanel.id} chanel={chanel} user={user} />
        </Grid.Column>

        <MetaPanel />

      </Grid >
    );
  }
}

const mapStateToProps = ({ user, chanel }) => ({
  user: user.currentUser,
  chanel: chanel.currentChanel,
})

export default connect(mapStateToProps)(App);
