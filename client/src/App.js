import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import MenuBar from './components/MenuBar';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Container>
    </BrowserRouter>
  );
}

export default App;
