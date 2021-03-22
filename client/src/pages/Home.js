import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

const centeredColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: 'max-content',
  minWidth: '35vw',
};
function Home() {
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  if (posts) {
    console.log(posts);
  }
  return (
    <Grid centered>
      <Grid.Column style={centeredColumnStyle}>
        {loading ? (
          <h2>Loading posts...</h2>
        ) : (
          posts && posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </Grid.Column>
    </Grid>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likesCount
      likes {
        username
      }
      commentsCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
