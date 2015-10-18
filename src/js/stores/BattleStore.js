import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';
import keyMirror from 'react/lib/keyMirror';

const BATTLE_STATES = keyMirror({
    NO_BATTLE: null,
    LOADING: null,
    BATTLE: null,
    DEFEAT: null
});

/**
 * Formats the JSON response from the Marvel API into character profiles used by the store
 */
function formatJSONResponse(json) {
  let character = json.data.results[0];
  return {
    id: character.id,
    strenght: character.comics.available,
    description: character.description,
    name: character.name,
    thumbnail: character.thumbnail.path + '/portrait_xlarge.' + character.thumbnail.extension,
    isFighting: true
  }
}

let _data = {
  villain: null,
  state: BATTLE_STATES.NO_BATTLE
};

const BattleStore = assign({}, BaseStore, {

  BATTLE_STATES,

  getState() {
    return assign({}, _data);
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: Dispatcher.register(function handleAction(payload) {
    const action = payload.action;

    switch (action.type) {
    case Constants.ActionTypes.BATTLE_RESET:
      _data.state = BATTLE_STATES.NO_BATTLE;
      BattleStore.emitChange();
      break;
    case Constants.ActionTypes.BATTLE_LOADING:
      _data.state = BATTLE_STATES.LOADING;
      BattleStore.emitChange();
      break;
    case Constants.ActionTypes.BATTLE_START:
      _data.villain = formatJSONResponse(action.villain);
      _data.state = BATTLE_STATES.BATTLE;
      BattleStore.emitChange();
      break;
    case Constants.ActionTypes.BATTLE_RESULTS:
      if (action.villain) _data.villain.defeated = true;
      BattleStore.emitChange();
      break;
    case Constants.ActionTypes.BATTLE_VICTORY:
      _data.state = BATTLE_STATES.NO_BATTLE;
      BattleStore.emitChange();
      break;
    case Constants.ActionTypes.BATTLE_DEFEAT:
      _data.state = BATTLE_STATES.DEFEAT;
      BattleStore.emitChange();
      break;
    }
  })
});

export default BattleStore;
