import React, { Component } from 'react';
// component
import HomeSlider from '../Home/HomeSlider';
import HomePromotion from '../Home/HomePromotion';
// include redux
import { connect } from 'react-redux';
// import functions where things are dispatched
import { getProductsBySell, getProductsByArrival } from '../../actions/productsActions';
// CardBlock from utils export
import CardBlock from '../utils/CardBlock';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }
  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock list={this.props.products.bySell} title="Best Selling Guitars" />
        <HomePromotion />
        <CardBlock list={this.props.products.byArrival} title="New Arrivals" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
export default connect(mapStateToProps)(Home);
