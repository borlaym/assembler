import React from 'react';
import ActionCreators from '../actions/SearchCharacterActionCreators';
import Config from '../Config';


export default React.createClass({

  TYPING_COOLDOWN_DURATION: 200,

  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  typingCooldown: null,

  handleChange(event) {
    if (this.typingCooldown) {
      clearTimeout(this.typingCooldown);
    }
    this.typingCooldown = setTimeout(() => {
      ActionCreators.startSearch(this.refs.search.getDOMNode().value);
    }, this.TYPING_COOLDOWN_DURATION);
  },

  render() {
    return (
      <input type="text" placeholder="Search for a character..." onChange={this.handleChange} ref="search" />
    );
  }
});
