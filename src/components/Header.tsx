import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AppBar, Container, Toolbar, Button } from '@mui/material';
import { auth } from '../firebase';
import { AppContext } from '../providers/AppProvider';

export const Header: React.FC = () => {
  const { user } = useContext(AppContext);

  return (
    <AppBar className="!bg-red" position="static">
      <Container maxWidth="xl" className="overflow-hidden">
        <Toolbar className="justify-between" disableGutters>
          <Link to="/">
            <div className="font-pacifico font-bold text-4xl">EDMON</div>
          </Link>
          {user &&
            <Button className="!text-white" onClick={() => auth.signOut()}>Logout</Button>
          }
        </Toolbar>
      </Container>
    </AppBar>
  )
}