import React, { Component } from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import firebase from "../../firebase";

export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            error: '',
            loading: false,
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            this.setState({ error: '' });

            if (!this.isFormValid()) {
                throw new Error('Invalid Form!');
            }

            if (!this.isPasswordsValid()) {
                throw new Error('Passwords Do not mutch!');
            }

            this.setState({ loading: true, error: '' });

            const { username, email, password, passwordConfirmation } = this.state;
            const createdUser = await firebase.auth().createUserWithEmailAndPassword(email, password);

        } catch (err) {
            this.setState({ error: err.message });
        } finally {
            this.setState({ loading: false });
        }
    }

    isFormValid = () => {

        const { username, email, password, passwordConfirmation } = this.state;

        if (!username.length || !email.length || !password.length || !passwordConfirmation.length) {
            return false;
        }

        return true;
    }

    isPasswordsValid = () => {

        const { password, passwordConfirmation } = this.state;

        if (password != passwordConfirmation) {
            return false;
        }

        return true;
    }

    render() {

        const { username, email, password, passwordConfirmation, error, loading } = this.state;

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450, }}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register For DevChat
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name="username" icon="user" iconPosition="left" placeholder="Username" type="text"
                                value={username}
                                onChange={this.handleChange} />
                            <Form.Input fluid name="email" icon="mail" iconPosition="left" placeholder="Email" type="text"
                                value={email}
                                onChange={this.handleChange} />
                            <Form.Input fluid name="password" icon="lock" iconPosition="left" placeholder="Password" type="password"
                                value={password}
                                onChange={this.handleChange} />
                            <Form.Input fluid name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Password Confirmation" type="password"
                                value={passwordConfirmation}
                                onChange={this.handleChange} />

                            <Button loading={loading} disabled={loading} color="orange" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>

                    {error.length > 0 && <Message error>
                        <h3>Error</h3>
                        <p>{error}</p>
                    </Message>}

                    <Message>
                        Already a user? <Link to="login">login</Link>
                    </Message>

                </Grid.Column>
            </Grid>
        )
    }
}
