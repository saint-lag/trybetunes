import React from 'react';
import PropTypes from 'prop-types';
import './components-styles/album-card.css';
import {
  addSong,
  removeSong,
} from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
    this.isChecked = this.isChecked.bind(this);
  }

  async isChecked(event) {
    const { removeSongFromFavorites } = this.props;
    const {
      trackId,
      trackName,
      previewUrl,
      trackExplicitness,
      trackNumber,
      isFavorite,
    } = this.props;
    const songObj = {
      trackId,
      trackName,
      previewUrl,
      trackExplicitness,
      trackNumber,
      isFavorite,
    };
    if (event.target.checked) {
      this.setState({ loading: true });
      await addSong(songObj);
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
      await removeSong(songObj);
      this.setState({ loading: false });
      if (removeSongFromFavorites) {
        removeSongFromFavorites(songObj.trackId);
      }
    }
  }

  render() {
    const { loading } = this.state;
    const {
      trackId,
      trackName,
      previewUrl,
      trackExplicitness,
      trackNumber,
      isFavorite,
    } = this.props;
    return (
      <div id={ trackId } className="music-card">
        {trackExplicitness !== 'notExplicit' && <h3>NSFW</h3>}
        <h3>{trackName}</h3>
        <h3>Track:</h3>
        <h3>{trackNumber}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="favorite-music-checkbox">
          Favorita
          <input
            id="favorite-music-checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            name={ trackId }
            type="checkbox"
            onClick={ this.isChecked }
            defaultChecked={ isFavorite }
          />
        </label>
        {loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackExplicitness: PropTypes.string,
  trackNumber: PropTypes.number,
  isFavorite: PropTypes.bool.isRequired,
  removeSongFromFavorites: PropTypes.func,
};

MusicCard.defaultProps = {
  trackExplicitness: 'notExplicit',
  trackNumber: NaN,
  removeSongFromFavorites: undefined,
};

export default MusicCard;
