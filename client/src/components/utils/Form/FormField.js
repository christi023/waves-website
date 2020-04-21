import React from 'react';

const FormField = ({ formData, change, id }) => {
  // show error message when field is required
  const showError = () => {
    let errorMessage = null;

    if (formData.validation && !formData.valid) {
      errorMessage = <div className="error_label">{formData.validationMessage}</div>;
    }
    return errorMessage;
  };
  // renderTemplate function
  const renderTemplate = () => {
    let formTemplate = null;

    switch (formData.element) {
      case 'input':
        formTemplate = (
          <div className="formBlock">
            <input
              {...formData.config}
              value={formData.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        );

        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormField;
