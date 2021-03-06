import React from 'react';
import TeamActionCreators from '../actions/TeamActionCreators';

export default React.createClass({

  removeCharacter() {
    TeamActionCreators.removeCharacter(this.props.character);
  },

  render() {
    var x = this.props.character.defeated ? (<span className="dead">X</span>) : "";
    var isFighting = this.props.character.isFighting && !this.props.character.defeated;
    var classes = isFighting ? 'character fighting' : 'character';
    return (
      <div className={classes}>
        {x}
        <img src={this.props.character.thumbnail} />
        <span onClick={this.removeCharacter} className="remove">&times;</span>
        <p className="name">{this.props.character.name}</p>
      </div>
    );
  }
});
