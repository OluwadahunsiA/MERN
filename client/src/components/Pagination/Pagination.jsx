import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts';
import useStyles from './styles';

const Paginate = ({ page }) => {
  const classes = useStyles();
  const { numOfPages } = useSelector((state) => state.posts);
  const state = useSelector((state) => state);
  console.log(numOfPages);
  console.log(state)

  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
