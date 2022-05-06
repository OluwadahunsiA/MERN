import React from 'react';
import Post from './Post/Post';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import { useSelector } from 'react-redux';

const Posts = ({ setCurrentId }) => {
  const { posts } = useSelector((state) => state.posts);

  const classes = useStyles();

  return !posts?.length ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts?.map((post, index) => (
        <Grid key={post._id + index} item xs={12} sm={12} lg={3}>
          <Post key={post._id + index} post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
