import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { Container, Button } from '@mui/material';
import { AppContext } from '../../providers/AppProvider';
import { firestore } from '../../firebase';
import { IPost } from '../../Model';

export const Channel: React.FC = () => {
  const { user } = useContext(AppContext);
  const [posts, setPosts] = useState<IPost[]>([]);
  const params = useParams();
  const id = params.id || '';
  console.log(id);

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
          };
          tempPosts.push(post);
        });
        setPosts(tempPosts);
      });
    }
    if (id) getPosts();
  }, [id]);

  return (
    <Container>
      <div className='py-8 space-y-4'>
        <div className='flex items-center justify-between'>
          <h1 className='font-bold text-3xl'>My Posts</h1>
          <Button variant="contained">new Post</Button>
        </div>
        <div>
          {
            posts.map((post) => <div key={post.id}>
              <div>{post.subject}</div>
              <div>{post.body}</div>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}