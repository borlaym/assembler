import React from 'react';
import Character from './Character.jsx';
import Store from '../stores/TeamStore';
import TeamStore from '../stores/TeamStore';
import Config from '../Config';
import { Link } from 'react-router';

export default React.createClass({

  getInitialState() {
    return Store.getState();
  },

  componentDidMount() {
    Store.addChangeListener(this._onChange);
    TeamStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
    TeamStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(Store.getState())
  },

  renderTeam() {
    return this.state.characters.map(function(character) {
      return (<Character character={character} key={character.id} />);
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
