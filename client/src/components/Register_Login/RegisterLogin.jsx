import React from 'react';
// usable component
import MyButton from '../utils/button';
// components
import Login from '../Login/Login';

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, labore! Nesciunt
              maxime, aliquam sunt quasi excepturi porro soluta necessitatibus? Recusandae!
            </p>
            <MyButton
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: '10px 0 0 0',
              }}
            />
          </div>
          <div className="right">
            <h1>Registered Customers</h1>
            <p>If you have an account please login</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
