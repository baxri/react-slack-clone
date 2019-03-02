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

    const { user } = this.props;

    return (
      <Grid columns="equal">

        <SidePanel user={user} />
        <ColorPanel />

        <Grid.Column style={{ marginLeft: "150px" }}>
          <Messages />
        </Grid.Column>

        <Grid.Column width="4">
          <MetaPanel />
        </Grid.Column>



      </Grid>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.currentUser,
})

export default connect(mapStateToProps)(App);
