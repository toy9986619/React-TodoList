import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyleNav = styled.div`
  padding: 5px;
`;

// const StyleNavLink

const Nav = () => (
  <StyleNav id="nav">
    <ul>
      <li>
        <NavLink to="/">TodoList</NavLink>
      </li>
      <li>
        <NavLink to="/profile">User profile</NavLink>
      </li>
    </ul>

  </StyleNav>
);

export default Nav;
