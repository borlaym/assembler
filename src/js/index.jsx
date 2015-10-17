import React from 'react';
import { Router, Route } from 'react-router'
import Assembler from './components/Assembler.jsx';
import Battle from './components/Battle.jsx'

React.render((
  <Router>
    <Route path="/" component={Assembler} />
    <Route path="/battle" component={Battle} />
  </Router>
), document.body);