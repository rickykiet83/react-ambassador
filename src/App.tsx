import './App.scss';

import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Login from './pages/Login';
import ProductsFrontend from './pages/ProductsFrontend';
import Profile from './pages/Profile';
import React from 'react';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={ProductsFrontend} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/profile' component={Profile} />
    </BrowserRouter>
  );
}

export default App;
