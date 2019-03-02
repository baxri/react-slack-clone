import React, { Component } from 'react'
import { Menu, Icon } from "semantic-ui-react";

export default class Chanels extends Component {

    constructor(props) {
        super(props)

        this.state = {
            chanels: [],
        }
    }


    render() {

        const { chanels } = this.state;

        return (
            <Menu.Menu>
                <Menu.Item>
                    <span>
                        <Icon name="exchange" /> CHANELS
                    </span>
                    {chanels.length} <Icon name="add" />
                </Menu.Item>
            </Menu.Menu>
        )
    }
}
