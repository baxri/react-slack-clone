import React, { Component } from 'react';
import { Grid } from "semantic-ui-react";
import './App.css';

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

class App extends Component {
  render() {
    return (
      <Grid columns="equal">

        <SidePanel />
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

export default App;
