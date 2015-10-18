import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';
import _ from 'lodash';

// data storage
let _data = [];

/**
 * Mark a hero as damaged
 */
function damageHero(hero) {
  var hero = _.find(_data, (character) => character.id === hero.id);
  hero.defeated = true;
  hero.isFighting = false;
}

// Facebook style store creation.
const TeamStore = assign({}, BaseStore, {
  // public methods used by Controller-View to operate on data
  getState() {
    return {
      characters: _data.concat([])
    }
  },



  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: Dispatcher.register(function handleAction(payload) {
    const action = payload.action;

    switch (action.type) {
    case Constants.ActionTypes.TEAM_ADD_CHARACTER:
      _data.push(action.character);
      TeamStore.emitChange();
      break;
    case Constants.ActionTypes.TEAM_REMOVE_CHARACTER:
      _data = _.without(_data, action.character);
      TeamStore.emitChange();
      break;
    case Constants.ActionTypes.BATTLE_START:
      _data.forEach((character) => character.isFighting = true);
      TeamStore.emitChange();
      break;
    case Constants.ActionTypes.BATTLE_RESULTS:
      if (action.hero) damageHero(action.hero);
      TeamStore.emitChange();
      break;
    case Constants.ActionTypes.BATTLE_VICTORY:
      _data.forEach((character) => {
        character.isFighting = false,
        character.defeated = false
      });
      TeamStore.emitChange();
      break;
    case Constants.ActionTypes.BATTLE_DEFEAT:
      _data = [];
      TeamStore.emitChange();
      break;
    }
  })
});

export default TeamStore;
