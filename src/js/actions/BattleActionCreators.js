import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import URL from 'url';
import Config from '../Config';
import async from 'async'

/* eslint-disable no-console */

export default {


  /**
   * Fight a random villain
   */
  battleNextVillain(characters) {
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.BATTLE_LOADING,
    });

    //Get a random villain from the api
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

      var villain = json.data.results[0];

      //Then figth with all characters
      setTimeout(() => {
        async.series(characters.map((character) => {
          return this.fight.bind(this, character, villain)
        }), function(victory) {
          if (victory) return Dispatcher.handleViewAction({
              type: Constants.ActionTypes.BATTLE_VICTORY,
            });
          return Dispatcher.handleViewAction({
            type: Constants.ActionTypes.BATTLE_DEFEAT,
          });
        });
      }, 1500);

    })
    .catch((err) => {
      console.log(err);
    });


  },

  /**
   * Check if the two characters had a common comic
   */
  fight(character, villain, callback) {

    var ids = [character.id, villain.id].join(',');

    var url = URL.format({
      host: Config.MARVEL_API_URI_HOST,
      pathname: Config.MARVEL_API_URI_PATHNAME + Config.MARVEL_API_URI_COMICS,
      query: {
        characters: ids,
        apikey: Config.MARVEL_API_PUBLIC_KEY,
        format: 'comic',
        formatType: 'comic',
        noVariants: true
      }
    });

    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      if (json.data.total > 0) {
        Dispatcher.handleViewAction({
          type: Constants.ActionTypes.BATTLE_RESULTS,
          villain
        });
        return setTimeout(callback.bind(null, true), 2000);
      } else {
        Dispatcher.handleViewAction({
          type: Constants.ActionTypes.BATTLE_RESULTS,
          hero: character
        });
        return setTimeout(callback, 2000);
      }
    })
    .catch((err) => console.log(err));

  },

};
