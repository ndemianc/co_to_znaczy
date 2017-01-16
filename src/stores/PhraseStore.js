var alt = require('../alt');
var PhraseActions = require('../actions/PhraseActions');
var PhraseSource = require('../sources/PhraseSource');
var FavoriteStore = require('./FavoriteStore');

class PhraseStore {
  constructor() {
    this.phrases = [];
    this.errorMessage = null;

    this.bindListeners({
      handleUpdatePhrases: PhraseActions.UPDATE_PHRASES,
      handleFetchPhrases: PhraseActions.FETCH_PHRASES,
      handlePhrasesFailed: PhraseActions.PHRASES_FAILED,
      setFavorites: PhraseActions.FAVORITE_PHRASE
    });

    this.exportPublicMethods({
      getPhrase: this.getPhrase
    });

    this.exportAsync(PhraseSource);
  }

  handleUpdatePhrases(phrases) {
    this.phrases = phrases;
    this.errorMessage = null;
  }

  handleFetchPhrases() {
    this.phrases = [];
  }

  handlePhrasesFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  resetAllFavorites() {
    this.phrases = this.phrases.map(phrase => {
      return {
        id: phrase.id,
        name: phrase.name,
        has_favorite: false
      }
    })
  }

  setFavorites(phrase) {
    this.waitFor(FavoriteStore);

    var favoritedPhrases = FavoriteStore.getState().phrases;

    this.resetAllFavorites();

    favoritedPhrases.forEach(phrase => {
      for (var i=0;i<this.phrases.length; i+=1) {
        if (this.phrases[i].id === phrase.id) {
          this.phrases[i].has_favorite = true;
          break;
        }
      }
    });
  }

  getPhrase(id) {
    var { phrases } = this.getState();
    for (var i = 0; i < phrases.length; i += 1) {
      if (phrases[i].id === id) {
        return phrases[i];
      }
    }
    return null;
  }
}

module.exports = alt.createStore(PhraseStore, 'PhraseStore');
