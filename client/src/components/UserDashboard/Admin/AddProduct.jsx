import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../hoc/userLayout';

import FormField from '../../utils/Form/FormField';
// utils import, where we keep functions- Form Actions
import {
  update,
  generateData,
  isFormValid,
  populateOptionField,
  resetFields,
} from '../../utils/Form/FormActions';

import { getBrands, getWoods, addProduct, clearProduct } from '../../../actions/productsActions';

class AddProduct extends Component {
  constructor() {
    super();

    // state
    this.state = {
      formError: false,
      formSuccess: false,
      formData: {
        name: {
          element: 'input',
          value: '',
          config: {
            label: 'Product name',
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
          showLabel: true,
        },
        description: {
          element: 'textarea',
          value: '',
          config: {
            label: 'Product description',
            name: 'description_input',
            type: 'text',
            placeholder: 'Enter your description',
          },
          validation: {
            // valid if user enters description
            required: true,
          },
          valid: false, // to know if element is valid at the end
          touched: false, // to skip validation right away
          validationMessage: '',
          showLabel: true,
        },
        price: {
          element: 'input',
          value: '',
          config: {
            label: 'Product price',
            name: 'price_input',
            type: 'text',
            placeholder: 'Enter your price',
          },
          validation: {
            // valid if user enters price
            required: true,
          },
          valid: false, // to know if element is valid at the end
          touched: false, // to skip validation right away
          validationMessage: '',
          showLabel: true,
        },
        brand: {
          element: 'select',
          value: '',
          config: {
            label: 'Product brand',
            name: 'brand_input',
            options: [],
          },
          validation: {
            // valid if user enters brand
            required: true,
          },
          valid: false, // to know if element is valid at the end
          touched: false, // to skip validation right away
          validationMessage: '',
          showLabel: true,
        },
        shipping: {
          element: 'select',
          value: '',
          config: {
            label: 'Shipping',
            name: 'shipping_input',
            options: [
              { key: true, value: 'Yes' },
              { key: false, value: 'No' },
            ],
          },
          validation: {
            // valid if user enters shipping
            required: true,
          },
          valid: false, // to know if element is valid at the end
          touched: false, // to skip validation right away
          validationMessage: '',
          showLabel: true,
        },
        available: {
          element: 'select',
          value: '',
          config: {
            label: 'Available, in stock',
            name: 'available_input',
            options: [
              { key: true, value: 'Yes' },
              { key: false, value: 'No' },
            ],
          },
          validation: {
            // valid if user enters shipping
            required: true,
          },
          valid: false, // to know if element is valid at the end
          touched: false, // to skip validation right away
          validationMessage: '',
          showLabel: true,
        },
        wood: {
          element: 'select',
          value: '',
          config: {
            label: 'Wood material',
            name: 'wood_input',
            options: [],
          },
          validation: {
            required: true,
          },
          valid: false, // to know if element is valid at the end
          touched: false, // to skip validation right away
          validationMessage: '',
          showLabel: true,
        },
        frets: {
          element: 'select',
          value: '',
          config: {
            label: 'Frets',
            name: 'frets_input',
            options: [
              { key: 20, value: 20 },
              { key: 21, value: 21 },
              { key: 22, value: 22 },
              { key: 24, value: 24 },
            ],
          },
          validation: {
            required: true,
          },
          valid: false, // to know if element is valid at the end
          touched: false, // to skip validation right away
          validationMessage: '',
          showLabel: true,
        },
        publish: {
          element: 'select',
          value: '',
          config: {
            label: 'Publish',
            name: 'publish_input',
            options: [
              { key: true, value: 'Public' },
              { key: false, value: 'Hidden' },
            ],
          },
          validation: {
            // valid if user enters shipping
            required: true,
          },
          valid: false, // to know if element is valid at the end
          touched: false, // to skip validation right away
          validationMessage: '',
          showLabel: true,
        },
      },
    };
    // binding this
    this.updateFields = this.updateFields.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.resetFieldHandler = this.resetFieldHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  // update fields function
  updateFields = (newFormData) => {
    this.setState({
      formData: newFormData,
    });
  };

  // update form function for add products
  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'products');
    this.setState({
      formError: false,
      formData: newFormData,
    });
  };

  // reset all the fields and show message
  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formData, 'products');
    this.setState({
      formData: newFormData,
      formSuccess: true,
    });
    setTimeout(() => {
      this.setState(
        {
          formSuccess: false,
        },
        () => {
          this.props.dispatch(clearProduct());
        },
      );
    }, 3000);
  };

  // submit form function for add products
  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'products');
    let formIsValid = isFormValid(this.state.formData, 'products');
    if (formIsValid) {
      //console.log = dataToSubmit;
      this.props.dispatch(addProduct(dataToSubmit)).then(() => {
        if (this.props.products.addProduct.success) {
          // show success msg & reset the entire form
          this.resetFieldHandler();
        } else {
          this.setState({ formError: true });
        }
      });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  componentDidMount() {
    const formData = this.state.formData;
    // fetch all product brands & automatically add them to form data fields
    this.props.dispatch(getBrands()).then((response) => {
      const newFormData = populateOptionField(formData, this.props.products.brands, 'brand');
      //console.log(this.props.products.brands);
      this.updateFields(newFormData);
    });
    this.props.dispatch(getWoods()).then((response) => {
      const newFormData = populateOptionField(formData, this.props.products.woods, 'wood');
      //console.log(this.props.products.brands);
      this.updateFields(newFormData);
    });
  }

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add Product</h1>
          <form onSubmit={(event) => this.submitForm(event)}>
            <FormField
              id={'name'}
              formData={this.state.formData.name}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'description'}
              formData={this.state.formData.description}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'price'}
              formData={this.state.formData.price}
              change={(element) => this.updateForm(element)}
            />
            <div className="form_divider"></div>
            <FormField
              id={'brand'}
              formData={this.state.formData.brand}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'shipping'}
              formData={this.state.formData.shipping}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'available'}
              formData={this.state.formData.available}
              change={(element) => this.updateForm(element)}
            />

            <div className="form_divider"></div>

            <FormField
              id={'wood'}
              formData={this.state.formData.wood}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'frets'}
              formData={this.state.formData.frets}
              change={(element) => this.updateForm(element)}
            />

            <div className="form_divider"></div>

            <FormField
              id={'publish'}
              formData={this.state.formData.publish}
              change={(element) => this.updateForm(element)}
            />
            {this.state.formSuccess ? <div className="form_success"> Success</div> : null}

            {this.state.formError ? (
              <div className="error_label">Please enter all fields</div>
            ) : null}
            <button onClick={(event) => this.submitForm(event)}>Add product</button>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(AddProduct);
