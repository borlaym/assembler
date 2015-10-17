import React, {PropTypes} from 'react';
import SearchCharacter from './SearchCharacter.jsx';

export default React.createClass({
  propTypes: {
    tasks: PropTypes.array.isRequired,
    onAddTask: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      tasks: []
    }
  },

  /**
   * Called when a character is selected from the search component
   */
  selectCharacter(character) {
    console.log("DSADSA");
    console.log(character);
  },

  render() {
    let {onAddTask, onClear, tasks} = this.props;
    return (
      <div>
        <h1>Assemblr</h1>
        <SearchCharacter onSelect={this.selectCharacter} />
      </div>
    );
  }
});
