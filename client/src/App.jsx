import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/home';
import Auth from './components/Auth/Auth';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails';
import { useSelector } from 'react-redux';

const App = () => {
  const stateToken = useSelector((state) => state?.authReducer?.authData?.token);

  const localToken = JSON.parse(localStorage.getItem('profile'))?.token;

  const token = stateToken || localToken;

  console.log('state updated');

  const ShowPages = (token) => {
    if (!token) {
      return (
        <Switch>
          <Route path="/auth" exact component={Auth} />
          <Redirect to="/auth" />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" component={PostDetails} />
          <Redirect to="/posts" />
        </Switch>
      );
    }
  };

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        {ShowPages(token)}
      </Container>
    </BrowserRouter>
  );
};

export default App;
