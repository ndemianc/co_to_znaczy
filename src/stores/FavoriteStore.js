var alt = require('../alt');
var PhraseActions = require('../actions/PhraseActions');

class FavoriteStore {
  constructor() {
    this.phrases = [];

    this.bindListeners({
      addFavoritePhrase: PhraseActions.FAVORITE_PHRASE
    });
  }

  addFavoritePhrase(phrase) {
    this.phrases.push(phrase);
  }
};

module.exports = alt.createStore(FavoriteStore, 'FavoriteStore');
