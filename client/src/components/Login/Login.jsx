import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormField from '../utils/Form/FormField';
// utils import, where we keep functions- Form Actions
import { update, generateData, isFormValid } from '../utils/Form/FormActions';
import { loginUser } from '../../actions/userActions';

class Login extends Component {
  // create state for form
  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          // valid if user enters valid email
          required: true,
          //email: true,
        },
        valid: false, // to know if element is valid at the end
        touched: false, // to skip validation right away
        validationMessage: '',
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password',
        },
        validation: {
          // valid if user enters valid password
          required: true,
        },
        valid: false, // to know if element is valid at the end
        touched: false, // to skip validation right away
        validationMessage: '',
      },
    },
  };

  // updateForm function
  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'login');
    this.setState({
      formError: false,
      formData: newFormData,
    });
  };

  // submitForm function
  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'login');
    let formIsValid = isFormValid(this.state.formData, 'login');

    if (formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then((response) => {
        if (response.payload.loginSuccess) {
          console.log(response.payload);
          // send user to new route using react-router
          this.props.history.push('/user/dashboard');
        } else {
          this.setState({
            formError: true,
          });
        }
      });

      //console.log(dataToSubmit);
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={(event) => this.submitForm(event)}>
          <FormField
            id={'email'}
            formData={this.state.formData.email}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={'password'}
            formData={this.state.formData.password}
            change={(element) => this.updateForm(element)}
          />
          {this.state.formError ? <div className="error_label">Please enter all fields</div> : null}
          <button onClick={(event) => this.submitForm(event)}>Log In</button>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(Login));
