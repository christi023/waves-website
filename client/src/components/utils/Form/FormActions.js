// this is where our functions are place for form
// validate
export const validate = (element, formData = []) => {
  let error = [true, ''];

  // validation for email
  if (element.validation.email) {
    // equal to the value of the element
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? 'Must be a valid email' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  // validation for  password confirmation
  if (element.validation.confirm) {
    const valid = element.value.trim() === formData[element.validation.confirm].value;
    const message = `${!valid ? 'Passwords do not match' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  // validation for required fields
  if (element.validation.required) {
    // equal to the value of the element
    const valid = element.value.trim() !== '';
    const message = `${!valid ? 'This field is required' : ''}`;
    error = !valid ? [valid, message] : error;
  }
  return error;
};

// update
export const update = (element, formData, formName) => {
  // create new form data & mutate it
  const newFormData = { ...formData };
  // equal to the key of what we are getting
  const newElement = {
    ...newFormData[element.id], // just email data
  };
  newElement.value = element.event.target.value; // this have the new value of things

  // check if info is valid
  if (element.blur) {
    let validData = validate(newElement, formData);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }
  newElement.touched = element.blur;
  // new form data have new element
  newFormData[element.id] = newElement;

  return newFormData;
};

//generate Data
export const generateData = (formData, formName) => {
  let dataToSubmit = {};

  for (let key in formData) {
    if (key !== 'confirmPassword') {
      dataToSubmit[key] = formData[key].value;
    }
  }
  return dataToSubmit;
};

// isFormValid
// loop and make sure they have valid keyword
export const isFormValid = (formData, formName) => {
  let formIsValid = true;
  for (let key in formData) {
    formIsValid = formData[key].valid && formIsValid;
  }
  return formIsValid;
};
