import React, { Component } from 'react'
import { Header, Segment, Input, Icon } from "semantic-ui-react";

export default class MessageHeader extends Component {
    render() {
        return (
            <Segment clearing>
                <Header  as="h2" floated="left" >
                    <span>
                        Chanels
                        <Icon name="star outline" color="black" />
                    </span>
                    <Header.Subheader>
                        2 Users
                    </Header.Subheader>
                </Header>
                <Header floated="right" >
                    <Input icon="search" size="mini" name="SearchTerm" placeholder="Search Messages" />
                </Header>
            </Segment>
        )
    }
}
