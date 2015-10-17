import React from 'react';
import Character from './Character.jsx';
import Store from '../stores/TeamStore';

export default React.createClass({
  getInitialState() {
    return Store.getState();
  },

  componentDidMount() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(Store.getState())
  },

  renderTeam() {
    return this.state.characters.map(function(character) {
      return (<Character character={character} />)
    });
  },

  render() {
    return (
      <div className="team">
      {this.renderTeam()}
      </div>
    );
  }
});
