import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import FormField from '../utils/Form/FormField';

// utils import, where we keep functions- Form Actions
import { update, generateData, isFormValid } from '../utils/Form/FormActions';
import { registerUser } from '../../actions/userActions';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      formError: false,
      formSuccess: false,
      formData: {
        name: {
          element: 'input',
          value: '',
          config: {
            name: 'name_input',
            type: 'text',
            placeholder: 'Enter your name',
          },
          validation: {
            // valid if user enters valid name
            required: true,
          },
          valid: false, // to know if element is valid at the end
          touched: false, // to skip validation right away
          validationMessage: '',
        },
        lastname: {
          element: 'input',
          value: '',
          config: {
            name: 'lastname_input',
            type: 'text',
            placeholder: 'Enter your lastname',
          },
          validation: {
            // valid if user enters valid name
            required: true,
          },
          valid: false, // to know if element is valid at the end
          touched: false, // to skip validation right away
          validationMessage: '',
        },
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
        confirmPassword: {
          element: 'input',
          value: '',
          config: {
            name: 'confirm_password_input',
            type: 'password',
            placeholder: 'Confirm your password',
          },
          validation: {
            // valid if user enters valid password
            required: true,
            confirm: 'password',
          },
          valid: false, // to know if element is valid at the end
          touched: false, // to skip validation right away
          validationMessage: '',
        },
      },
    };
    // Binding methods
    this.toggle = this.toggle.bind(this);
    //this.submitForm = this.submitForm.bind(this);
  }

  //toggle function
  toggle = () => {
    if (this.submitForm) {
      this.setState({ formSuccess: true });
      setTimeout(() => {
        this.props.history.push('/register_login');
      }, 3000);
    }
  };
  // update form function for register
  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'register');
    this.setState({
      formError: false,
      formData: newFormData,
    });
  };

  // submit form function for register
  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'register');
    let formIsValid = isFormValid(this.state.formData, 'register');
    if (formIsValid) {
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then((response) => {
          if (response.payload.success) {
            this.setState({
              //show msg & redirect user to login
              formError: false,
              formSuccess: true,
            }); // redirect user
          } else {
            this.setState({ formError: true });
          }
        })
        .catch((event) => {
          this.setState({ formError: true });
        });
      //console.log= (dataToSubmit)
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={(event) => this.submitForm(event)}>
                <h2>Personal Information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={'name'}
                      formData={this.state.formData.name}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={'lastname'}
                      formData={this.state.formData.lastname}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    id={'email'}
                    formData={this.state.formData.email}
                    change={(element) => this.updateForm(element)}
                  />
                </div>
                <h2>Verify Password</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={'password'}
                      formData={this.state.formData.password}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={'confirmPassword'}
                      formData={this.state.formData.confirmPassword}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  {this.state.formError ? (
                    <div className="error_label">Please enter all fields</div>
                  ) : null}
                  <button onClick={(event) => this.toggle(event)}>Create an account</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Congratulations !!</div>
            <div>You will be redirected to LOGIN in a couple of seconds ....</div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(Register);
