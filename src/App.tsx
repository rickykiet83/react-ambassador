import './App.scss';

import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import ProductsFrontend from './pages/ProductsFrontend';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' component={ProductsFrontend} />
    </BrowserRouter>
  );
}

export default App;
