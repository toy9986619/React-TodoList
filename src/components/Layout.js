import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav/index';

const Layout = (props) => {
  const { children } = props;
  return (
    <div>
      <Nav />
      <main className="container">
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
