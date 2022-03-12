import React from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Albums extends React.Component {
  constructor() {
    super();
    this.state = {
      albumResults: null,
    };
    this.apiRequest = this.apiRequest.bind(this);
  }

  componentDidMount() {
    this.apiRequest();
  }

  async apiRequest() {
    const { artistQuery } = this.props;
    const { didApiReturned } = this.props;
    this.setState({
      albumResults: await searchAlbumsAPI(artistQuery),
    });
    didApiReturned(true);
  }

  render() {
    const { albumResults } = this.state;
    return (
      albumResults
      && (
        <section id="albums-container">
          {albumResults.map((album) => {
            const {
              artistId,
              artistName,
              collectionId,
              collectionName,
              collectionPrice,
              artworkUrl100,
              releaseDate,
              trackCount,
            } = album;
            return (
              <AlbumCard
                key={ collectionId }
                artistId={ artistId }
                artistName={ artistName }
                collectionId={ collectionId }
                collectionPrice={ collectionPrice }
                collectionName={ collectionName }
                artworkUrl100={ artworkUrl100 }
                releaseDate={ releaseDate }
                trackCount={ trackCount }
              />
            );
          })}
        </section>
      )
    );
  }
}

Albums.propTypes = {
  didApiReturned: PropTypes.func.isRequired,
  artistQuery: PropTypes.string.isRequired,
};

export default Albums;
