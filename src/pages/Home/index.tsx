import React, { useContext, useMemo, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { AppContext } from '../../providers/AppProvider';
import { firestore } from '../../firebase';
import { IChannel } from '../../Model';

export const Home: React.FC = () => {
  const { user } = useContext(AppContext);
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [newChannel, setNewChannel] = useState('');
  const [open, setOpen] = React.useState(false);
  const domain = useMemo(() => {
    if (user?.email) {
      return user.email.split('@')[1];
    }
    return '';
  }, [user]);

  useEffect(() => {
    const getChannels = async () => {
      const ref = await firestore.collection('channels');
      ref.onSnapshot(async (snapShot) => { 
        const tempChannels: IChannel[] = [];
        await snapShot.forEach(async (item) => {
          if (item.data().email.includes(domain)) {
            const channel: IChannel = {
              id: item.id,
              name: item.data().name,
              email: item.data().email,
            };
            tempChannels.push(channel);
          }
        });
        setChannels(tempChannels);
      });
    }
    getChannels();
  }, [domain]);

  const handleClose = () => {
    setOpen(false);
    setNewChannel('');
  }

  const handleAdd = () => {
    firestore.collection('channels').add({
      name: newChannel,
      email: user.email
    });
    setOpen(false);
    setNewChannel('');
  }

  return (
    <Container>
      <div className='py-8 space-y-4'>
        <div className='flex items-center justify-between'>
          <div>{domain}</div>
          <h1 className='font-bold text-3xl'>My Channels</h1>
          <Button variant="contained" onClick={() => setOpen(true)}>new Channel</Button>
        </div>
        <div>
          {
            channels.map((channel) => <Link key={channel.id} to={`/channels/${channel.id}`}>
              <div className='underline'>
                {channel.name}
              </div>
            </Link>
          )}
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Channel</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Channel Name"
            fullWidth
            variant="standard"
            value={newChannel}
            onChange={(e) => setNewChannel(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}