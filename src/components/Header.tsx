import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, Container, Toolbar } from '@mui/material';

export const Header: React.FC = () => {

  return (
    <AppBar className="!bg-red" position="static">
      <Container maxWidth="xl" className="overflow-hidden">
        <Toolbar className="justify-between" disableGutters>
          <Link to="/">
            <div className="font-pacifico font-bold text-4xl">EDMON</div>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  )
}