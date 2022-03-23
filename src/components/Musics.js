import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';

class Musics extends React.Component {
  render() {
    const { albumTracks, favoriteSongs } = this.props;
    console.log(favoriteSongs);
    return (
      albumTracks
      && (albumTracks.length > 0 ? (
        <section id="album-container">
          {albumTracks.map((track, index) => {
            if (index !== 0) {
              const {
                previewUrl,
                trackName,
                trackId,
                trackTimeMillis,
                trackExplicitness,
                trackNumber,
              } = track;
              const isFavorite = favoriteSongs.includes(String(trackId));
              return (
                <MusicCard
                  key={ trackId }
                  trackId={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  trackTimeMillis={ trackTimeMillis }
                  trackExplicitness={ trackExplicitness }
                  trackNumber={ trackNumber }
                  isFavorite={ isFavorite }
                />
              );
            }
            return null;
          })}
        </section>
      ) : (
        <section id="album-container">
          <h1>Nada encontrado!</h1>
        </section>
      ))
    );
  }
}

Musics.propTypes = {
  albumTracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Musics;
