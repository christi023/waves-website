import React, { Component } from 'react';
// imports from material ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

//
export default class CollapseCheckbox extends Component {
  constructor() {
    super();
    this.state = {
      // for checkboxes
      open: false,
      checked: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAngle = this.handleAngle.bind(this);
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

  // render list function in collapse
  renderList = () =>
    this.props.list
      ? this.props.list.map((value) => (
          <ListItem key={value._id} style={{ padding: '10px 0' }}>
            <ListItemText primary={value.name} />
            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                onChange={this.handleToggle(value._id)}
                checked={this.state.checked.indexOf(value._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  // handle toggle function for check boxes
  handleToggle = (value) => () => {
    // create var- shorthand way
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value); // enter arr and search for entry with id / same value
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    //console.log(newChecked);

    this.setState(
      {
        checked: newChecked,
      },
      () => {
        this.props.handleFilters(newChecked);
      },
    );
  };

  render() {
    return (
      <div className="collapse_items_wrapper">
        <List style={{ borderBottom: '1px solid #dbdbdb' }}>
          <ListItem onClick={this.handleClick} style={{ padding: '10px 23px 10px 0' }}>
            <ListItemText primary={this.props.title} className="collapse_title" />
            {this.handleAngle()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}
