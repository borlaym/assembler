import React, {PropTypes} from 'react';
import SearchCharacter from './SearchCharacter.jsx';

export default React.createClass({

  /**
   * Called when a character is selected from the search component
   */
  selectCharacter(character) {
    console.log(character);
  },

  render() {
    return (
      <div>
        <h1>Assembler</h1>
        <p>Assemble your own Avengers team!</p>
        <SearchCharacter onSelect={this.selectCharacter} />
      </div>
    );
  }
});
