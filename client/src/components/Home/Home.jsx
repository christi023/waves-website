import React, { Component } from 'react';
// component
import HomeSlider from '../Home/HomeSlider';
import HomePromotion from '../Home/HomePromotion';

export default class Home extends Component {
  render() {
    return (
      <div>
        <HomeSlider />
        <HomePromotion />
      </div>
    );
  }
}
