import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/userActions';
// is user is not Authenticated, show circular progress
import CircularProgress from '@material-ui/core/CircularProgress';
// Preventing Routing
import { withRouter } from 'react-router';
// composed component- function that returns a class/function
export default function (ComposedClass, reload, adminRoute = null) {
  class AuthCheck extends Component {
    state = {
      loading: true,
    };

    componentDidMount() {
      this.props.dispatch(auth()).then((response) => {
        let user = this.props.user.userData;
        console.log(user);

        if (!user.isAuth) {
          if (reload) {
            this.props.history.push('/register_login');
          }
        } else {
          /*if (reload === false) {
            this.props.history.push('/user/dashboard');
          }*/
        }

        this.setState({ loading: false });
      });
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: '#2196f3' }} thickness={7} />
          </div>
        );
      }
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }
  function mapStateToProps(state) {
    return {
      user: state.user,
    };
  }
  return connect(mapStateToProps)(withRouter(AuthCheck));
}
