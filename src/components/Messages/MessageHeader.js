import React, { Component } from 'react'
import { Header, Segment, Input, Icon } from "semantic-ui-react";

export default class MessageHeader extends Component {

    countUniqUsers = (messages) => {
        const user = messages.reduce((acc, message) => {
            if (message.user && !acc.includes(message.user.id)) {
                acc.push(message.user.id);
            }

            return acc;
        })

        return this.countUniqUsers.length;
    }

    render() {

        const { chanel, messages } = this.props;

        return (
            <Segment className="messages-header">
                <Header as="h2" floated="left" >
                    <span>
                        {chanel.name}
                        <Icon name="star outline" color="black" />
                    </span>
                    <Header.Subheader>
                        ({this.countUniqUsers(messages)}) Users, ({messages.length}) Messages
                    </Header.Subheader>
                </Header>
                <Header floated="right" >
                    <Input icon="search" size="mini" name="SearchTerm" placeholder="Search Messages" />
                </Header>
            </Segment>
        )
    }
}
