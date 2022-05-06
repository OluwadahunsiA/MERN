import React, { useState, useEffect } from 'react';
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button
} from '@material-ui/core';

import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Paginate from '../Pagination/Pagination';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch, currentId]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tag) => {
    setTags(tags.filter((t) => tag !== t));
  };

  const searchPost = (e) => {
    if (search.trim() || tags.length > 0) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || ''}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          className={classes.appBarSearch}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>

          <Grid item xs={12} sm={7} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyPress={handleKeyPress}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className={classes.pagination} elevation={6}>
              <Paginate page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
export default Home;
