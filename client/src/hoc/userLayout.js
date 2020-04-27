import React from 'react';
import { Link } from 'react-router-dom';

// create variable to host links
const links = [
  {
    name: 'My account',
    linkTo: '/user/dashboard',
  },
  {
    name: 'User information',
    linkTo: '/user/user_profile',
  },
  {
    name: 'My cart',
    linkTo: '/user/cart',
  },
];

// render a private route, display user layout
const UserLayout = (props) => {
  const generateLinks = (links) =>
    links.map((item, i) => (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    ));

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My account</h2>
          <div className="links">{generateLinks(links)}</div>
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
