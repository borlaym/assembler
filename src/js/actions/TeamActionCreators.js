import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

/* eslint-disable no-console */

export default {

  /**
   * Add a character to the team!
   */
  addCharacter(character) {

    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.TEAM_ADD_CHARACTER,
      character
    });

  }
};
