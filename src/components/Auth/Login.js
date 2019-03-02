import React, { Component } from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import firebase from "../../firebase";

export default class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: 'test@test.com',
      password: 'test123',
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

      const { email, password } = this.state;

      if (!email) {
        throw new Error('Email not defined!');
      }

      if (!password) {
        throw new Error('Password not defined!');
      }

      this.setState({ loading: true });
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
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

    const { email, password, error, loading } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450, }}>
          <Header as="h2" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login For DevChat
                    </Header>
          <Form onSubmit={this.handleSubmit}>
            <Segment stacked>

              <Form.Input fluid error={this.handleInputError('email')} name="email" icon="mail" iconPosition="left" placeholder="Email" type="text"
                value={email}
                onChange={this.handleChange} />
              <Form.Input fluid name="password" error={this.handleInputError('password')} icon="lock" iconPosition="left" placeholder="Password" type="password"
                value={password}
                onChange={this.handleChange} />

              <Button loading={loading} disabled={loading} color="violet" fluid size="large">Login</Button>
            </Segment>
          </Form>

          {error.length > 0 && <Message error>
            <h3>Error</h3>
            <p>{error}</p>
          </Message>}

          <Message>
            Don't have an account? <Link to="register">Register</Link>
          </Message>

        </Grid.Column>
      </Grid>
    )
  }
}
