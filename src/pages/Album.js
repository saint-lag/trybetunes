import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Musics from '../components/Musics';
import { getUser } from '../services/userAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      userName: null,
      loading: true,
      albumTracks: null,
      didApiReturned: false,
      canRenderAlbum: false,
      artistName: null,
      collectionId: null,
      collectionName: null,
      artworkUrl100: null,
      releaseDate: null,
      trackCount: null,
    };
    this.apiRequest = this.apiRequest.bind(this);
    this.getUserRequest = this.getUserRequest.bind(this);
    this.receiveCheckerAndHandler = this.receiveCheckerAndHandler.bind(this);
    this.getFavoriteSongsRequest = this.getFavoriteSongsRequest.bind(this);
  }

  async componentDidMount() {
    await this.getUserRequest();
    await this.getFavoriteSongsRequest();
    await this.receiveCheckerAndHandler();
  }

  async getFavoriteSongsRequest() {
    const request = await getFavoriteSongs();
    this.setState({ favoriteSongs: request });
    this.setState({ didFavoriteSongsApiReturned: true });
  }

  async getUserRequest() {
    this.setState({
      userName: await getUser().then((user) => user.name),
      loading: false,
    });
  }

  async apiRequest(id, receiveByProps = true) {
    if (receiveByProps) {
      const { location } = this.props;
      const { state } = location;
      const { collectionId } = state;
      this.setState({
        albumTracks: await getMusics(collectionId),
        didApiReturned: true,
        canRenderAlbum: true,
      });
    } else {
      const albumTracks = await getMusics(id);
      this.setState({
        albumTracks,
        didApiReturned: true,
        canRenderAlbum: true,
      });
      if (albumTracks.length > 0) {
        this.setState({
          artistName: albumTracks[0].artistName,
          collectionId: albumTracks[0].collectionId,
          collectionName: albumTracks[0].collectionName,
          artworkUrl100: albumTracks[0].artworkUrl100,
          releaseDate: albumTracks[0].releaseDate,
          trackCount: albumTracks[0].trackCount,
        });
      }
    }
  }

  async receiveCheckerAndHandler() {
    const didReceiveByProps = false;

    if (didReceiveByProps) {
      const { location } = this.props;
      const { state } = location;
      const {
        artistName,
        collectionId,
        collectionName,
        artworkUrl100,
        releaseDate,
        trackCount,
      } = state;
      this.setState({
        artistName,
        collectionId,
        collectionName,
        artworkUrl100,
        releaseDate,
        trackCount,
        canRenderAlbum: true,
      });
    } else {
      const { match } = this.props;
      const { params } = match;
      const { id } = params;
      await this.apiRequest(id, false);
    }
  }

  render() {
    const {
      canRenderAlbum,
      userName,
      loading,
      didApiReturned,
      albumTracks,
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
      releaseDate,
      trackCount,
      didFavoriteSongsApiReturned,
      favoriteSongs,
    } = this.state;

    return (
      <main data-testid="page-album">
        {loading ? <Loading /> : <Header userName={ userName } />}
        {didFavoriteSongsApiReturned ? (
          canRenderAlbum && (
            <>
              <h1 data-testid="album-name">{collectionName}</h1>
              <h2 data-testid="artist-name">
                Artist:
                {' '}
                {artistName}
              </h2>
              <img src={ artworkUrl100 } alt={ collectionName } />
              <h4>
                Release date:
                {' '}
                {releaseDate}
              </h4>
              <h4>
                Tracks:
                {' '}
                {trackCount}
              </h4>
              {!didApiReturned ? (
                <Loading />
              ) : (
                <Musics
                  favoriteSongs={ favoriteSongs }
                  albumId={ collectionId }
                  albumTracks={ albumTracks }
                />
              )}
            </>
          )
        )
          : <Loading />}
        {' '}
      </main>
    );
  }
}

Album.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
