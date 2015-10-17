import React, {PropTypes} from 'react';
import SearchCharacter from './SearchCharacter.jsx';
import Team from './Team.jsx';
import TeamActionCreators from '../actions/TeamActionCreators';
import TeamStore from '../stores/TeamStore';
import Config from '../Config';
import { Link } from 'react-router'

export default React.createClass({

  getInitialState() {
    return {
      full: false
    };
  },

  componentDidMount() {
    TeamStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    TeamStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState({
      full: TeamStore.getState().characters.length === Config.TEAM_MAX_SIZE
    });
  },

  /**
   * Called when a character is selected from the search component
   */
  selectCharacter(character) {
    TeamActionCreators.addCharacter(character);
  },

  render() {

    var hidden = !this.state.full ? "hidden" : "";

    return (
      <div>
        <h1>Assembler</h1>
        <p>Assemble your own Avengers team!</p>
        <SearchCharacter onSelect={this.selectCharacter} />
        <h3>Your team:</h3>
        <Team />
        <Link to="battle" className={hidden}>Save the Earth!</Link>
      </div>
    );
  }
});
