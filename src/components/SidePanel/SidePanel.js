import React, { Component } from 'react'
import { Menu, Grid } from "semantic-ui-react";

import UserPanel from "./UserPanel";
import Chanels from "./Chanels";
import DirectMessages from "./DirectMessages";

export default class SidePanel extends Component {
    render() {

        const { user } = this.props;

        return (
            <Menu
                // size="large"
                inverted
                vertical
                // fixed="left"
                style={{ background: "#4c3c4c", fontSize: "1.2em", height: '100vh', width: '100%' }}
                className="side-panel"
            >
                <UserPanel user={user} />
                <Chanels user={user} />
                <DirectMessages user={user} />
            </Menu>
        )
    }
}
