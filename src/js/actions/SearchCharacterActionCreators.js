import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import Config from '../Config';
import URL from 'url';

/* eslint-disable no-console */

var url = URL.format({
  host: Config.MARVEL_API_URI_HOST,
  pathname: Config.MARVEL_API_URI_PATHNAME + Config.MARVEL_API_URI_CHARACTERS,
  query: {
    name: 'Hawkeye',
    apikey: Config.MARVEL_API_PUBLIC_KEY
  }
});

export default {

  /**
   * Initiate a search for a character on the Marvel api
   */
  startSearch(text) {

    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.CHARACTER_SEARCH_STARTED
    });

    var url = URL.format({
      host: Config.MARVEL_API_URI_HOST,
      pathname: Config.MARVEL_API_URI_PATHNAME + Config.MARVEL_API_URI_CHARACTERS,
      query: {
        nameStartsWith: text,
        apikey: Config.MARVEL_API_PUBLIC_KEY
      }
    });

    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.CHARACTER_SEARCH_FINISHED,
        data: json
      });
    })
    .catch((err) => {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.CHARACTER_SEARCH_FAILED,
        err: err
      });
    });

  }
};
