/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';

function TodoItemInput(props) {
  const {
    editData, handleKeyPress, data,
  } = props;

  return (
    <input
      type="text"
      onChange={editData}
      onKeyPress={handleKeyPress}
      // onBlur={this.handleEditBlur}
      value={data}
      autoFocus
    />
  );
}

TodoItemInput.propTypes = {
  editData: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  data: PropTypes.string.isRequired,
};

function TodoItemSpan(props) {
  const {
    handleClick, handleKeyPress, spanStyle, key, data,
  } = props;

  return (
    <span
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      style={spanStyle}
      key={key}
      role="menuitem"
      tabIndex="-1"
    >
      {data}
    </span>
  );
}

TodoItemSpan.defaultProps = {
  spanStyle: {},
};

TodoItemSpan.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  spanStyle: PropTypes.objectOf(PropTypes.string),
  key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  data: PropTypes.string.isRequired,
};

function TodoItemRow(props) {
  const { children, style } = props;
  return (
    <li style={style}>
      {children}
    </li>
  );
}

TodoItemRow.defaultProps = {
  style: {},
};

TodoItemRow.propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.element.isRequired,
};

function TodoItemTagRow(props) {
  const { children } = props;
  return (
    <TodoItemRow style={{ display: 'inline', marginLeft: '5px', border: '1px gray solid' }}>
      {children}
    </TodoItemRow>
  );
}

TodoItemTagRow.propTypes = {
  children: PropTypes.element.isRequired,
};

export {
  TodoItemInput, TodoItemSpan, TodoItemRow, TodoItemTagRow,
};
