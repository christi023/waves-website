import React, { Component } from 'react';
// components
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}
