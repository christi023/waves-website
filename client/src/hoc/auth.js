import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/userActions';
// is user is not Authenticated, show circular progress
import CircularProgress from '@material-ui/core/CircularProgress';

// composed component- function that returns a class/function
export default function (ComposedClass, reload, adminRoute = null) {
  class AuthCheck extends Component {
    state = {
      loading: true,
    };

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: '#2196f3' }} thickness={7} />
          </div>
        );
      }
      return <div>component</div>;
    }
  }
  function mapStateToProps(state) {
    return {
      user: state.user,
    };
  }
  return connect(mapStateToProps)(AuthCheck);
}
