import React, { Component } from 'react'
import { Segment, Accordion, Header, Icon, Image } from "semantic-ui-react";
import { connect } from "react-redux";

class MetaPanel extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeIndex: 0,
            userPosts: {},
        }
    }

    componentDidUpdate() {
        this.conuntUserPosts();
    }

    setActiveIndex = (event, titleProps) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;
        this.setState({ activeIndex: newIndex });
    }

    conuntUserPosts = () => {
        const { messages } = this.props;

        let userPosts = messages.reduce((acc, message) => {


            if (message.user.name in acc) {
                acc[message.user.name].count = acc[message.user.name].count + 1;
            } else {
                acc[message.user.name] = {
                    avatar: message.user.avatar,
                    count: 1,
                }
            }

            return acc;
        }, {});

        // console.log(userPosts)

        return userPosts;
    }

    render() {

        const { activeIndex } = this.state;
        const { chanel, messages, isPrivateChanel } = this.props;

        if (!chanel) return null;

        return (
            <Segment>
                <Header as="h3" attached="top">
                    About # Chanel
                </Header>
                <Accordion styled attached="true">
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.setActiveIndex}>
                        <Icon name="dropdown" />
                        <Icon name="info" /> Chanel Details
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        {chanel.details}
                    </Accordion.Content>
                </Accordion>
                <Accordion styled attached="true">
                    <Accordion.Title active={activeIndex === 1} index={1} onClick={this.setActiveIndex}>
                        <Icon name="dropdown" />
                        <Icon name="user circle" />
                        Top Posters
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        Details
                    </Accordion.Content>
                </Accordion>
                <Accordion styled attached="true">
                    <Accordion.Title active={activeIndex === 2} index={2} onClick={this.setActiveIndex}>
                        <Icon name="dropdown" />
                        <Icon name="pencil alternate" /> Created By
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <Header as="h3">
                            <Image circular src={chanel.createdBy.avatar} />
                            {chanel.createdBy.name}
                        </Header>
                    </Accordion.Content>
                </Accordion>
            </Segment>
        )
    }
}

const mapStateToProps = ({ chanel }) => ({
    chanel: chanel.currentChanel,
    messages: chanel.messages,
    isPrivateChanel: chanel.isPrivateChanel,
});

export default connect(mapStateToProps)(MetaPanel);
