import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import URL from 'url';
import Config from '../Config';

/* eslint-disable no-console */

export default {

  /**
   * Get a random villain
   */
  getNextVillain() {
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.BATTLE_LOADING,
    });

    var offset = Math.floor(Math.random() * 1485);

    var url = URL.format({
      host: Config.MARVEL_API_URI_HOST,
      pathname: Config.MARVEL_API_URI_PATHNAME + Config.MARVEL_API_URI_CHARACTERS,
      query: {
        limit: 1,
        offset,
        apikey: Config.MARVEL_API_PUBLIC_KEY
      }
    });

    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      Dispatcher.handleViewAction({
        type: Constants.ActionTypes.BATTLE_START,
        villain: json
      });
    })
    .catch((err) => {
      console.log(err);
    });


  },

};
