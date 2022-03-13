import React from 'react';
// import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

// export const Album = () => {
//   const location = useLocation();
//   const {
//     artistId,
//     artistName,
//     collectionId,
//     collectionName,
//     collectionPrice,
//     artworkUrl100,
//     releaseDate,
//     trackCount,
//   } = location.state;
//   const loading()

//   return (
//     <main data-testid="page-album">
//       {loading ? <Loading /> : <Header userName={ userName } />}
//       <h1>{collectionName}</h1>
//       <h2>{artistName}</h2>
//       <img src={ artworkUrl100 } alt={ collectionName } />
//     </main>
//   );
// };

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: null,
      loading: true,
    };
  }

  async componentDidMount() {
    this.setState({
      userName: await getUser().then((user) => user.name),
      loading: false,
    });
  }

  render() {
    const {
      userName,
      loading,
    } = this.state;
    return (
      <main data-testid="page-album">
        {loading ? <Loading /> : <Header userName={ userName } />}
        <h1>Working on It Soon haha</h1>
      </main>
    );
  }
}

export default Album;
