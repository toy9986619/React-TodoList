import React from 'react';
import PropTypes from 'prop-types';

class NewTagButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      tagName: '',
    };
  }

  handleClick = () => {
    this.setState({ isEdit: true });
  }

  handleNameChange = (e) => {
    this.setState({ tagName: e.target.value });
  }

  handleEditComplete = (e) => {
    if (e.key === 'Enter') {
      this.createTag();
    }
  }

  createTag = () => {
    const { createTag } = this.props;
    const { tagName } = this.state;

    if (tagName) {
      createTag(tagName);
    }

    this.setState({
      isEdit: false,
      tagName: '',
    });
  }

  render() {
    const style = { display: 'inline', marginLeft: '5px' };
    const { isEdit, tagName } = this.state;

    return (
      <li style={style}>
        {isEdit
          ? (
            <input
              value={tagName}
              onChange={this.handleNameChange}
              onKeyPress={this.handleEditComplete}
            />
          )
          : (
            <i
              className="fas fa-plus-circle"
              onClick={this.handleClick}
              onKeyPress={() => { }}
              role="button"
              tabIndex="-1"
            />
          )}
      </li>
    );
  }
}

NewTagButton.propTypes = {
  createTag: PropTypes.func.isRequired,
};

export default NewTagButton;
