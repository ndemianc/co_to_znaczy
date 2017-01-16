var alt = require('../alt');

class PhraseActions {
  updatePhrases(phrases) {
    this.dispatch(phrases);
  }

  fetchPhrases() {
    this.dispatch();
  }

  phrasesFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  favoritePhrase(phrase) {
    this.dispatch(phrase);
  }
}

module.exports = alt.createActions(PhraseActions);
