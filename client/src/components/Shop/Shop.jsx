import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
// fetch a list of brands & woods from server- so use Redux
import { getBrands, getWoods, getProductsToShop } from '../../actions/productsActions'; // functions to dispatch an action
// utils
import PageTop from '../utils/PageTop';
import { frets, price } from '../utils/Form/FixedCategories';
// reusable component
import CollapseCheckbox from '../utils/CollapseCheckbox';
import CollapseRadio from '../utils/CollapseRadio';
// components
import LoadMoreCards from './LoadMoreCards';

class Shop extends Component {
  constructor() {
    super();
    this.state = {
      grid: ' ',
      limit: 6,
      skip: 0,
      filters: {
        brand: [],
        frets: [],
        wood: [],
        price: [],
      },
    };
    // bind methods
    this.handleFilters = this.handleFilters.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.loadMoreCards = this.loadMoreCards.bind(this);
    this.handleGrid = this.handleGrid.bind(this);
  }

  componentDidMount() {
    // dispatching actions
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());

    this.props.dispatch(getProductsToShop(this.state.skip, this.state.limit, this.state.filters));
  }

  //handle price function
  handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  // handle filter function- checkboxes
  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === 'price') {
      let priceValue = this.handlePrice(filters);
      newFilters[category] = priceValue;
    }

    // when changes are made, set filters
    this.showFilteredResults = newFilters;
    this.setState({
      filters: newFilters,
    });
  };

  // show filtered results function
  showFilteredResults = (filters) => {
    this.props
      .dispatch(
        getProductsToShop(
          0, // resetting skip
          this.state.limit,
          filters,
        ),
      )
      .then(() => {
        this.setState({
          skip: 0,
        });
      });
  };

  // load more cards function
  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;

    this.props
      .dispatch(
        getProductsToShop(
          // passing the arguments
          skip,
          this.state.limit,
          this.state.filters,
          this.props.products.toShop,
        ),
      )
      .then(() => {
        this.setState({
          skip,
        });
      });
  };

  // handle grids function
  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? ' grid_bars' : '',
    });
  };

  render() {
    const products = this.props.products;

    return (
      <div>
        <PageTop title="Browse Products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={(filters) => this.handleFilters(filters, 'brand')} // triggers a  function for checking boxes
              />
              <CollapseCheckbox
                initState={false}
                title="Frets"
                list={frets}
                handleFilters={(filters) => this.handleFilters(filters, 'frets')} // triggers a  function for checking boxes
              />
              <CollapseCheckbox
                initState={false}
                title="Wood"
                list={products.woods}
                handleFilters={(filters) => this.handleFilters(filters, 'wood')} // triggers a  function for checking boxes
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={(filters) => this.handleFilters(filters, 'price')} // triggers a  function for checking boxes
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <i className="fas fa-th"></i>
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <i className="fas fa-bars"></i>
                  </div>
                </div>
              </div>
              <div>
                <LoadMoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={products.toShopSize}
                  products={products.toShop}
                  loadMore={() => this.loadMoreCards()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // request to server & access to products
    products: state.products,
  };
};

export default connect(mapStateToProps)(Shop);
