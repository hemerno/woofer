import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Form, Button, Message } from 'semantic-ui-react';

import { useForm } from '../util/hooks';

function Login(props) {
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
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
          type="password"
          error={errors.password ? true : false}
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={onChange}
        />
        <Button type="submit" content="Login" color="black" />
      </Form>
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
