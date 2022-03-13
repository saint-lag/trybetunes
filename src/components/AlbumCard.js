import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './components-styles/album-card.css';

class AlbumCard extends React.Component {
  render() {
    const {
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = this.props;
    return (
      <div id={ collectionId } className="album-card">
        <img src={ artworkUrl100 } alt={ collectionName } />
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ { pathname: `/album/${collectionId}`,
            state:
            { artistId,
              artistName,
              collectionId,
              collectionName,
              collectionPrice,
              artworkUrl100,
              releaseDate,
              trackCount },
          } }
        >
          {collectionName}
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,
};

export default AlbumCard;
