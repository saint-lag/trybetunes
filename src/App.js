import React from 'react';
import './app.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Loading from './components/Loading';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
    this.loadingStateHandler = this.loadingStateHandler.bind(this);
  }

  loadingStateHandler(state) {
    this.setState({
      loading: state,
    });
  }

  render() {
    const { loading } = this.state;
    const { loadingStateHandler } = this;
    return (
      <Router>
        {loading ? (
          <Loading />
        ) : (
          <Switch>
            <Route
              path="/search"
              render={ () => (
                <Search loadingStateHandler={ loadingStateHandler } />
              ) }
            />
            <Route
              path="/album/:id"
              render={ () => <Album loadingStateHandler={ loadingStateHandler } /> }
            />
            <Route
              path="/favorites"
              render={ () => (
                <Favorites loadingStateHandler={ loadingStateHandler } />
              ) }
            />
            <Route
              path="/profile/edit"
              render={ () => (
                <ProfileEdit loadingStateHandler={ loadingStateHandler } />
              ) }
            />
            <Route
              path="/profile"
              render={ () => (
                <Profile loadingStateHandler={ loadingStateHandler } />
              ) }
            />
            <Route
              exact
              path="/"
              render={ () => <Login loadingStateHandler={ loadingStateHandler } /> }
            />
            <Route
              path="*"
              render={ () => (
                <NotFound loadingStateHandler={ loadingStateHandler } />
              ) }
            />
          </Switch>
        )}
      </Router>
    );
  }
}

export default App;
