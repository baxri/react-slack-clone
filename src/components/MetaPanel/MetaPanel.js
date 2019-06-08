import React, { Component } from 'react'
import { Segment, Accordion, Header, Icon } from "semantic-ui-react";

export default class MetaPanel extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeIndex: 0,
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
                        Details
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
                        Details
                    </Accordion.Content>
                </Accordion>
            </Segment>
        )
    }
}
