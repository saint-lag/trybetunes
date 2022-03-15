import React from 'react';
import './components-styles/header.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userName } = this.props;
    return (
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">{userName}</h2>
        <div className="links">
          <Link to="/profile" data-testid="link-to-profile">
            Profile
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Favorites
          </Link>
          <Link to="/search" data-testid="link-to-search">
            Search
          </Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default Header;
