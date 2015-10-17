import React, {PropTypes} from 'react';
import SearchCharacter from './SearchCharacter.jsx';
import Team from './Team.jsx';
import TeamActionCreators from '../actions/TeamActionCreators';

export default React.createClass({

  /**
   * Called when a character is selected from the search component
   */
  selectCharacter(character) {
    TeamActionCreators.addCharacter(character);
  },

  render() {
    return (
      <div>
        <h1>Assembler</h1>
        <p>Assemble your own Avengers team!</p>
        <SearchCharacter onSelect={this.selectCharacter} />
        <h3>Your team:</h3>
        <Team />
      </div>
    );
  }
});
