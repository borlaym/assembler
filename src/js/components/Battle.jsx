import React from 'react';
import TeamStore from '../stores/TeamStore';
import BattleStore from '../stores/BattleStore';
import { Link } from 'react-router';
import Config from '../Config';
import assign from 'object-assign';
import Team from './Team.jsx';
import Character from './Character.jsx';
import BattleActionCreators from '../actions/BattleActionCreators';

export default React.createClass({
  getInitialState() {
    return {
      team: TeamStore.getState(),
      battle: BattleStore.getState()
    };
  },

  componentDidMount() {
    TeamStore.addChangeListener(this._onTeamChange);
    BattleStore.addChangeListener(this._onBattleChange);
  },

  componentWillUnmount() {
    TeamStore.removeChangeListener(this._onTeamChange);
    BattleStore.removeChangeListener(this._onBattleChange);
  },

  _onTeamChange() {
    this.setState({
      team: TeamStore.getState()
    });
  },

  _onBattleChange() {
    this.setState({
      battle: BattleStore.getState()
    });
  },

  /**
   * Determines if you're able to fight
   */
  canFight() {
    return this.state.team.characters.length === Config.TEAM_MAX_SIZE;
  },

  /**
   * Render a "Team not available" view and a link to the Assembler
   */
  renderNoTeam() {
    return (
      <div>
        <h1>Save the Earth</h1>
        <p>You can´t fight without a team!</p>
        <Link to="">Avengers Assemble!</Link>
      </div>
    );
  },

  /**
   * Go to the next fight
   */
  nextFight() {
    BattleActionCreators.battleNextVillain(this.state.team.characters);
  },

  /**
   * Renders either a Next Fight button or the villain you face
   */
  renderVillain() {
    if (this.state.battle.state === BattleStore.BATTLE_STATES.NO_BATTLE) return (
      <button className='btn' onClick={this.nextFight}>Next Fight</button>
    );
    else if (this.state.battle.state === BattleStore.BATTLE_STATES.LOADING) return (
      <p>Loading...</p>
    )
    else return (
      <div className="villain">
        <p className='vs'>- VS -</p>
        <Character character={this.state.battle.villain} />
      </div>
    );
  },

  render() {
    if (!this.canFight()) return this.renderNoTeam();
    return (
      <div className="battle">
        <h1>Save the Earth</h1>
        <p>The rules are pretty simple. You´ll face random enemies one after another, and you can beat them if any of your 
        characters have appeared in the same comic as them. See how many you can defeat!</p>
        <Team characters={this.state.team.characters} />
        {this.renderVillain()}
      </div>
    );
  }
});
