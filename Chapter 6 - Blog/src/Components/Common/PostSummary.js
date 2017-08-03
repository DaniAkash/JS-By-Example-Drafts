import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../routes';

const PostSummary = ({post}) => (
  <div className={`post-container container`}>
    <h3>{post.title}</h3>
    <p>{post.author}</p>
    <p>{post.content}</p>
    <NavLink className={`btn btn-primary read-more-button`} activeClassName={'active'} to={routes.post.replace(':id', post.id)}>Read More</NavLink>
  </div>
);

export default PostSummary;
