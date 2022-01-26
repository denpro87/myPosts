import React from 'react'
import { Routes as Switch, Route, useLocation, Navigate } from 'react-router-dom';

// Front pages
import { Home } from './pages';

const Routes = () => (
    <Switch>
      <Route path="/" element={<Home />} />
    </Switch>
)

export default Routes
