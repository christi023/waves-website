import React, { Component } from 'react';
// imports from material ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class CollapseRadio extends Component {
  constructor() {
    super();
    this.state = {
      // for checkboxes
      open: false,
      value: '0',
    };
    // binding methods
    this.handleClick = this.handleClick.bind(this);
    this.handleAngle = this.handleAngle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  componentDidMount() {
    if (this.props.initState) {
      this.setState({
        open: this.props.initState,
      });
    }
  }

  // handleClick function
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  // handle angle function - change icons if state is true or false
  handleAngle = () =>
    this.state.open ? (
      <div className="icon">
        <i className=" fas fa-angle-up"></i>
      </div>
    ) : (
      <div className="icon">
        <i className=" fas fa-angle-down"></i>
      </div>
    );

  // handle change function for price changes
  handleChange = (event) => {
    this.props.handleFilters(event.target.value);
    this.setState({ value: event.target.value });
  };

  // render list function
  renderList = () =>
    this.props.list
      ? this.props.list.map((value) => (
          <FormControlLabel
            key={value._id}
            value={`${value._id}`}
            control={<Radio />}
            label={value.name}
          />
        ))
      : null;

  render() {
    return (
      <div>
        <List style={{ borderBottom: '1px solid #dbdbdb' }}>
          <ListItem onClick={this.handleClick} style={{ padding: '10px 23px 10px 0' }}>
            <ListItemText primary={this.props.title} className="collapse_title" />
            {this.handleAngle()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <RadioGroup
                aria-label="prices"
                name="prices"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}
