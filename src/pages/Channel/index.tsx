import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Divider } from '@mui/material';
import { AppContext } from '../../providers/AppProvider';
import { firestore } from '../../firebase';
import { IPost, IComment } from '../../Model';

export const Channel: React.FC = () => {
  const { user } = useContext(AppContext);
  const [posts, setPosts] = useState<IPost[]>([]);
  const params = useParams();
  const id = params.id || '';
  const [newPost, setNewPost] = useState<{ subject: string; body: string }>({subject: '', body: ''});
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const getPosts = async () => {
      const ref = await firestore.collection('channels').doc(id).collection('posts');
      ref.onSnapshot(async (snapShot) => { 
        const tempPosts: IPost[] = [];
        await snapShot.forEach(async (item) => {
          const post: IPost = {
            id: item.id,
            subject: item.data().subject,
            body: item.data().body,
            author: item.data().author,
            comments: item.data().comments,
          };
          tempPosts.push(post);
        });
        setPosts(tempPosts);
      });
    }
    if (id) getPosts();
  }, [id]);

  const handleClose = () => {
    setOpen(false);
    setNewPost({subject: '', body: ''});
  }

  const handleAdd = () => {
    firestore.collection('channels').doc(id).collection('posts').add({
      ...newPost,
      author: user.email
    });
    setOpen(false);
    setNewPost({subject: '', body: ''});
  }

  const handleAddComment = (post: IPost) => {
    if (comment?.length) {
      const newComments = post.comments ? [...post.comments, { content: comment, author: user.email }] : [{ content: comment, author: user.email }];
      firestore.collection('channels').doc(id).collection('posts').doc(post.id).update({
        ...post,
        comments: newComments,
      });
    }
    setComment('');
    setActiveId('');
  }

  const handleClickComment = (postId: string) => {
    setComment('');
    setActiveId(postId);
  }

  return (
    <Container>
      <div className='py-8 space-y-4'>
        <div className='flex items-center justify-between'>
          <h1 className='font-bold text-3xl'>My Posts</h1>
          <Button variant="contained" onClick={() => setOpen(true)}>new Post</Button>
        </div>
        <div className='space-y-4'>
          {
            posts.map((post) => <div key={post.id} className="flex gap-x-6">
              <div>{post.author}</div>
              <div>
                <div>{post.subject}</div>
                <div>{post.body}</div>
                <div>
                  {
                    post.comments?.length &&
                      <Divider className="!my-2" />
                  }
                  {
                    post.comments?.map((com: IComment, index: number) => <div key={index} className="flex gap-x-4">
                      <div>{com.author}</div>
                      <div>{com.content}</div>
                    </div>)
                  }
                </div>
                {
                  activeId === post.id ?
                    <div className='flex items-center gap-x-4'>
                      <TextField
                        autoFocus
                        margin="dense"
                        label="Comment"
                        fullWidth
                        variant="standard"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button variant="contained" onClick={() => handleAddComment(post)}>submit</Button>
                    </div>
                  : <Button onClick={() => handleClickComment(post.id)}>Add comment</Button>
                }
              </div>
            </div>
          )}
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subject"
            fullWidth
            variant="standard"
            value={newPost.subject}
            onChange={(e) => setNewPost((prev) => ({ ...prev, subject: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Body"
            fullWidth
            variant="standard"
            value={newPost.body}
            onChange={(e) => setNewPost((prev) => ({ ...prev, body: e.target.value }))}
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