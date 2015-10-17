import React, {PropTypes} from 'react';
import ActionCreators from '../actions/SearchCharacterActionCreators';
import Config from '../Config';
import Store from '../stores/SearchStore';

export default React.createClass({

  propTypes: {
    onSelect: PropTypes.func.isRequired,
  },

  TYPING_COOLDOWN_DURATION: 600,

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

  typingCooldown: null,

  /**
   * When typing in the search area, sends a request to the Marvel api.
   * Waits at least TYPING_COOLDOWN_DURATION milliseconds between requests
   */
  onInputChange(event) {
    if (this.typingCooldown) {
      clearTimeout(this.typingCooldown);
    }
    this.typingCooldown = setTimeout(() => {
      ActionCreators.startSearch(this.refs.search.getDOMNode().value);
    }, this.TYPING_COOLDOWN_DURATION);
  },

  resetSearch() {
    this.refs.search.getDOMNode().value = '';
    ActionCreators.startSearch("");
  },

  /**
   * Renders a loading indicator while we are fetching results from the server, nothing otherwise
   */
  renderLoadingIndicator() {
    if (this.state.isLoading) {
      return (<div className="loadingIndicator">Loading...</div>);
    }
    return "";
  },

  /**
   * Select a character, also reset search value
   */
  selectCharacter(character, event) {
    this.resetSearch();
    this.props.onSelect(character);
  },

  /**
   * Renders all results below the search field
   */
  renderResults() {
    return this.state.results.map((character) => {
      return (
        <div className='characterSearchResult' key={character.id} onClick={this.selectCharacter.bind(this, character)}>
          <img src={character.thumbnail} />
          <h2>{character.name}</h2>
        </div>
      );
    });
  },

  render() {
    return (
      <div className="characterSearch">
        <input type="search" placeholder="Search to add a character..." onChange={this.onInputChange} ref="search" />
        {this.renderLoadingIndicator()}
        <div className='searchResults'>
          {this.renderResults()}
        </div>
      </div>
    );
  }
});
