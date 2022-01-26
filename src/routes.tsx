import React from 'react'
import { Routes as Switch, Route, useLocation, Navigate } from 'react-router-dom';

// Front pages
import { Home, Login } from './pages';

const Routes = () => (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Switch>
)

export default Routes
