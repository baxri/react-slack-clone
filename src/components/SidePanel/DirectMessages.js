import React, { Component } from 'react'
import { Menu, Icon } from "semantic-ui-react";

export default class DirectMessages extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
        }
    }


    render() {

        const { users } = this.state;

        return (
            <Menu.Menu className="menu" style={{marginTop: '10px',}}>
                <Menu.Item>
                    <span>
                        <Icon name="mail" /> DIRECT MESSAGES
                    </span>{' '}
                    ({users.length})
                </Menu.Item>
            </Menu.Menu>
        )
    }
}

