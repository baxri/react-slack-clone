import React, { Component } from 'react'
import { Header, Segment, Input, Icon } from "semantic-ui-react";

export default class MessageHeader extends Component {

    countUniqUsers = (messages) => {

        if (messages.length == 0) {
            return 0;
        }

        const users = messages.reduce((acc, message) => {
            if (!acc.includes(message.user.id)) {
                acc.push(message.user.id);
            }

            return acc;
        }, [])

        return users.length;
    }

    render() {

        const { chanel, messages, handleSearch, searchLoader } = this.props;

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
                    <Input icon="search" size="mini" loading={searchLoader} name="SearchTerm" placeholder="Search Messages" onChange={handleSearch} />
                </Header>
            </Segment>
        )
    }
}
