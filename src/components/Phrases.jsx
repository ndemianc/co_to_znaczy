var React = require('react');
var AltContainer = require('alt/AltContainer');
var PhraseStore = require('../stores/PhraseStore');
var FavoriteStore = require('../stores/FavoriteStore');
var PhraseActions = require('../actions/PhraseActions');

var Favorites = React.createClass({
  render() {
    return (
      <ul>
        {this.props.phrases.map((phrase, i) => {
          return (
            <li key={i}>{phrase.name}</li>
          );
        })}
      </ul>
    );
  }
});

var AllPhrases = React.createClass({
  addFave(ev) {
    var phrase = PhraseStore.getPhrase(
      Number(ev.target.getAttribute('data-id'))
    );
    PhraseActions.favoritePhrase(phrase);
  },

  render() {
    if (this.props.errorMessage) {
      return (
        <div>{this.props.errorMessage}</div>
      );
    }

    if (PhraseStore.isLoading()) {
      return (
        <div>
          <img src="ajax-loader.gif" />
        </div>
      )
    }

    return (
      <ul>
        {this.props.phrases.map((phrase, i) => {
          var faveButton = (
            <button onClick={this.addFave} data-id={phrase.id}>
              Favorite
            </button>
          );
          return (
            <li key={i}>
              {phrase.name} {phrase.has_favorite ? '<3' : faveButton}
            </li>
          );
        })}
      </ul>
    );
  }
});

var Phrases = React.createClass({
  componentDidMount() {
    PhraseStore.fetchPhrases();
  },

  render() {
    return (
      <div>
        <h1>Phrases</h1>
        <AltContainer store={PhraseStore}>
          <AllPhrases />
        </AltContainer>

        <h1>Favorites</h1>
        <AltContainer store={FavoriteStore}>
          <Favorites />
        </AltContainer>
      </div>
    );
  }
});

module.exports = Phrases;
