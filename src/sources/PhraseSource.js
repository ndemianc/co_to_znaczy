var PhraseActions = require('../actions/PhraseActions');

var mockData = [
  { id: 0, name: 'do nogi!' },
  { id: 1, name: 'na drug\u0105 nog\u0119' },
  { id: 2, name: 'do g\xF3ry nogami' },
  { id: 3, name: 'noga za nog\u0105' },
  { id: 4, name: 'n\xF3\u017Cka' },
  { id: 5, name: 'k\u0142amstwo ma kr\xF3tkie nogi' }
];

var PhraseSource = {
  fetchPhrases() {
    return {
      remote() {
        return new Promise(function (resolve, reject) {
          // simulate an asynchronous flow where data is fetched on
          // a remote server somewhere.
          setTimeout(function () {

            // change this to `false` to see the error action being handled.
            if (true) {
              // resolve with some mock data
              resolve(mockData);
            } else {
              reject('Things have broken');
            }
          }, 250);
        });
      },

      local() {
        // Never check locally, always fetch remotely.
        return null;
      },

      success: PhraseActions.updatePhrases,
      error: PhraseActions.phrasesFailed,
      loading: PhraseActions.fetchPhrases
    }
  }
};

module.exports = PhraseSource;
