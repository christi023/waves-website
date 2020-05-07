import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { logoutUser } from '../../actions/userActions';
// import redux
import { connect } from 'react-redux';

class Header extends Component {
  // create state
  state = {
    page: [
      {
        name: 'Home',
        linkTo: '/',
        public: true,
      },
      {
        name: 'Guitars',
        linkTo: '/shop',
        public: true,
      },
    ],
    user: [
      {
        name: 'My Cart',
        linkTo: '/user/cart',
        public: false,
      },
      {
        name: 'My Account',
        linkTo: '/user/dashboard',
        public: false,
      },
      {
        name: 'Log in',
        linkTo: '/register_login',
        public: true,
      },
      {
        name: 'Log out',
        linkTo: '/user/logout',
        public: false,
      },
    ],
  };

  // logout function
  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        this.props.history.push('/');
      }
    });
  };

  // cart link function
  cartLink = (item, i) => {
    const user = this.props.user.userData;
    return (
      <div className="cart_link" key={i}>
        <span>{user.cart ? user.cart.length : 0}</span>
        <Link to={item.linkTo}>{item.name}</Link>
      </div>
    );
  };

  // defaultLink function
  defaultLink = (item, i) =>
    item.name === 'Log out' ? (
      <div
        className="log_out_link"
        key={i}
        onClick={() => {
          this.logoutHandler();
        }}
      >
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    );

  // showLinks function
  showLinks = (type) => {
    //make new list for checking
    let list = [];
    if (this.props.user.userData) {
      type.forEach((item) => {
        if (!this.props.user.userData.isAuth) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          // if user is not log in
          if (item.name !== 'Log in') {
            list.push(item);
          }
        }
      });
    }
    // return loop- default link
    return list.map((item, i) => {
      if (item.name !== 'My Cart') {
        return this.defaultLink(item, i); // return a new function
      } else {
        return this.cartLink(item, i);
      }
    });
  };
  render() {
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">WAVES</div>
          </div>
          <div className="right">
            <div className="top">{this.showLinks(this.state.user)}</div>
            <div className="bottom">{this.showLinks(this.state.page)}</div>
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps)(withRouter(Header));
