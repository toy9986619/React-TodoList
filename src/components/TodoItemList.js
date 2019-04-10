/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';

function TodoItemInput(props) {
  const { editData, handleKeyPress, data } = props;

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
    handleClick, handleKeyPress, style, key, data,
  } = props;

  return (
    <span
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      style={style}
      key={key}
      role="menuitem"
      tabIndex="-1"
    >
      {data}
    </span>
  );
}

TodoItemSpan.defaultProps = {
  style: {},
};

TodoItemSpan.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
  key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  data: PropTypes.string.isRequired,
};

class TodoItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editTarget: null,
      editTagTarget: null,
    };
  }

  changeEdit = (item) => {
    this.setState({ editTarget: item });
  }

  editData = (e) => {
    const { editTarget } = this.state;
    this.setState({
      editTarget: {
        ...editTarget,
        name: e.target.value,
      },
    });
  }

  saveEditData = () => {
    const { editTarget } = this.state;
    const { saveData } = this.props;
    this.setState({ editTarget: null });
    saveData(editTarget);
  }

  editTag = (e) => {
    const { editTagTarget } = this.state;

    this.setState({
      editTagTarget: {
        ...editTagTarget,
        data: e.target.value,
      },
    });
  }

  changeTag = (listDataId, tagIndex, data) => {
    this.setState({ editTagTarget: { listDataId, tagIndex, data } });
  }

  saveEditTag = () => {
    const { editTagTarget } = this.state;
    const { saveTag } = this.props;
    this.setState({ editTagTarget: null });
    saveTag(editTagTarget);
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.saveEditData();
    }
  }

  handleTagEditEnterPress = (e) => {
    if (e.key === 'Enter') {
      this.saveEditTag();
    }
  }

  render() {
    const { data } = this.props;
    const { editTarget } = this.state;
    const editIndex = editTarget ? editTarget.id : null;
    const { editTagTarget } = this.state || null;

    return (
      <ul>
        {
          data.map(item => (
            <li>
              {
                editIndex === item.id
                  ? (
                    <TodoItemInput
                      editData={this.editData}
                      handleKeyPress={this.handleKeyPress}
                      data={editTarget.name}
                    />
                  )
                  : (
                    <TodoItemSpan
                      handleClick={() => { this.changeEdit(item); }}
                      handleKeyPress={() => { }}
                      style={{ display: 'block' }}
                      key={item.id}
                      data={item.name}
                    />
                  )
              }
              <div>
                <span>tags: </span>
                <ul style={{ display: 'inline', padding: '0px' }}>
                  {
                    item.tags.map((itemData, index) => (
                      editTagTarget && editTagTarget.listDataId
                        === item.id && editTagTarget.tagIndex === index
                        ? (
                          <TodoItemInput
                            editData={this.editTag}
                            handleKeyPress={this.handleTagEditEnterPress}
                            data={editTagTarget.data}
                          />
                        )
                        : (
                          <li style={{ display: 'inline', marginLeft: '5px', border: '1px gray solid' }}>
                            <TodoItemSpan
                              handleClick={() => { this.changeTag(item.id, index, itemData); }}
                              handleKeyPress={() => { }}
                              key={itemData}
                              data={itemData}
                            />
                            <span style={{ fontSize: '0.3rem', verticalAlign: 'super' }}><i className="fas fa-backspace fa-2x" /></span>
                          </li>
                        )
                    ))
                  }
                  <li style={{ display: 'inline', marginLeft: '5px' }}><i className="fas fa-plus-circle" /></li>
                </ul>
              </div>
            </li>
          ))
        }
      </ul>
    );
  }
}

TodoItemList.propTypes = {
  saveData: PropTypes.func.isRequired,
  saveTag: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default TodoItemList;
