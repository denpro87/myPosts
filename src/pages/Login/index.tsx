import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Divider } from '@mui/material';
import { auth, signInWithGoogle } from "../../firebase";
import { AppContext } from '../../providers/AppProvider';

export const Login: React.FC = () => {
  const { user } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const onClickSign = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
        setError("Error signing in with password and email!");
        console.error("Error signing in with password and email", error);
    });
  }

  return (
    <Container>
      <div className='pt-20 md:px-10'>
        <h1 className='font-bold text-3xl'>Sign in below</h1>
        <div className='mt-8 flex flex-col gap-y-8'>
          <TextField
            name="email"
            value={email}
            label="Email address"
            variant="outlined"
            error={!!error}
            helperText={error}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            name="password"
            type="password"
            value={password}
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={onClickSign}>Sign in</Button>
        </div>
        <Divider className="!my-8" />
        <Button className="w-full" variant="contained" onClick={signInWithGoogle}>Sign in with Google</Button>
      </div>
    </Container>
  )
}