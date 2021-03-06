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

    setActiveIndex = (event, titleProps) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;
        this.setState({ activeIndex: newIndex });
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
