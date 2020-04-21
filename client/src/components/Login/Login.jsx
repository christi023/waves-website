import React, { Component } from 'react';
import { connect } from 'react-redux';
// component
import FormField from '../utils/Form/formField';

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
          email: true,
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
  updateForm = () => {};

  // submitForm function
  submitForm = () => {};

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={(event) => this.submitForm(event)}>
          <FormField
            id={'email'}
            formData={this.state.formData.email}
            change={(element) => this.updateForm(element)}
          />
        </form>
      </div>
    );
  }
}

export default connect()(Login);
