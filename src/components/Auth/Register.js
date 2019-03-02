import React, { Component } from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import md5 from "md5";

export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'test',
            email: 'test@test.com',
            password: 'test123',
            passwordConfirmation: 'test123',
            error: '',
            loading: false,

            usersRef: firebase.database().ref('users'),
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

            const { username, email, password, passwordConfirmation, usersRef } = this.state;
            const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);

            await user.updateProfile({
                displayName: username,
                photoURL: `http://gravatar.com/avatar/${md5(user.email)}?d=identicon`
            });

            await usersRef.child(user.uid).set({
                name: user.displayName,
                avatar: user.photoURL,
            });

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

    handleInputError = (input) => {
        return this.state.error.toLowerCase().indexOf(input) > -1;
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
                            <Form.Input fluid name="username" error={this.handleInputError('username')} icon="user" iconPosition="left" placeholder="Username" type="text"
                                value={username}
                                onChange={this.handleChange} />
                            <Form.Input fluid error={this.handleInputError('email')} name="email" icon="mail" iconPosition="left" placeholder="Email" type="text"
                                value={email}
                                onChange={this.handleChange} />
                            <Form.Input fluid name="password" error={this.handleInputError('password')} icon="lock" iconPosition="left" placeholder="Password" type="password"
                                value={password}
                                onChange={this.handleChange} />
                            <Form.Input fluid name="passwordConfirmation" error={this.handleInputError('password')} icon="repeat" iconPosition="left" placeholder="Password Confirmation" type="password"
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
