import keyMirror from 'react/lib/keyMirror';

export default {
  // event name triggered from store, listened to by views
  CHANGE_EVENT: 'change',

  // Each time you add an action, add it here... They should be past-tense
  ActionTypes: keyMirror({
    TASK_ADDED: null,
    CHARACTER_SEARCH_STARTED: null,
    CHARACTER_SEARCH_FINISHED: null,
    CHARACTER_SEARCH_FAILED: null,
    CHARACTER_SEARCH_CLEAR: null,
    TEAM_ADD_CHARACTER: null,
    TEAM_REMOVE_CHARACTER: null,
    VILLAIN_SEARCH_STARTED: null,
    VILLAIN_SEARCH_FINISHED: null,
    VILLAIN_SEARCH_FAILED: null,
    BATTLE_LOADING: null,
    BATTLE_START: null,
    BATTLE_RESULTS: null,
    BATTLE_VICTORY: null,
    BATTLE_DEFEAT: null,
    BATTLE_RESET: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
