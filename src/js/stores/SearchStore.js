import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';
import _ from 'lodash';

// data storage
let _data = {
  isLoading: false,
  error: null,
  results: []
};

/**
 * Formats the JSON response from the Marvel API into character profiles used by the store
 */
function formatJSONResponse(json) {
  return json.data.results.map((character) => {
    return {
      id: character.id,
      strenght: character.comics.available,
      description: character.description,
      name: character.name,
      thumbnail: character.thumbnail.path + '/portrait_xlarge.' + character.thumbnail.extension
    }
  });
}

// Facebook style store creation.
const SearchStore = assign({}, BaseStore, {
  // public methods used by Controller-View to operate on data
  getState() {
    return assign({}, _data);
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: Dispatcher.register(function handleAction(payload) {
    const action = payload.action;
    switch (action.type) {
    case Constants.ActionTypes.CHARACTER_SEARCH_CLEAR:
      _data.isLoading = false;
      _data.results = [];
      SearchStore.emitChange();
      break;
    case Constants.ActionTypes.CHARACTER_SEARCH_STARTED:
      _data.isLoading = true;
      _data.results = [];
      SearchStore.emitChange();
      break;
    case Constants.ActionTypes.CHARACTER_SEARCH_FINISHED:
    case Constants.ActionTypes.CHARACTER_SEARCH_FAILED:
      _data.isLoading = false;
      _data.results = formatJSONResponse(action.data);
      SearchStore.emitChange();
      break;
    }
  })
});

export default SearchStore;
