import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Form, Button, Message, Icon } from 'semantic-ui-react';

import { useForm } from '../util/hooks';

function Register(props) {
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: '',
    password: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUserCallback() {
    addUser();
  }

  return (
    <div className="form-container">
      <Message
        attached
        header="Welcome to Woofer!"
        content="Fill out the form below to sign-up for a new account"
      />
      <Form
        onSubmit={onSubmit}
        noValidate
        loading={loading ? true : false}
        className="attached fluid segment"
      >
        <Form.Input
          type="text"
          error={errors.username ? true : false}
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          type="text"
          error={errors.email ? true : false}
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          type="password"
          error={errors.password ? true : false}
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          type="password"
          error={errors.confirmPassword ? true : false}
          placeholder="Repeat your password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" content="Register" color="black" />
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Already signed up?&nbsp;<a href="/login">Login here</a>.
      </Message>
      {Object.keys(errors).length > 0 && (
        <Message negative>
          {Object.values(errors).map((x) => (
            <p key={x}>{x}</p>
          ))}
        </Message>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
