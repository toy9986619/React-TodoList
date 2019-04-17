/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import { TodoItemInput, TodoItemSpan, TodoItemRow } from './Item';
import TodoItemTagList from './ItemTagList';

class TodoItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editTarget: null,
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

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.saveEditData();
    }
  }

  render() {
    const {
      data, saveTag, createTag,
      deleteTag,
    } = this.props;
    const { editTarget } = this.state;
    const editIndex = editTarget ? editTarget.id : null;

    return (
      <ul>
        {
          data.map(item => (
            <TodoItemRow>
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
                      spanStyle={{ display: 'block' }}
                      key={item.id}
                      data={item.name}
                    />
                  )
              }
              <TodoItemTagList
                saveTag={saveTag}
                createTag={createTag}
                deleteTag={deleteTag}
                key={item.name}
                listFrom={item.name}
                item={item}
              />
            </TodoItemRow>
          ))
        }
      </ul>
    );
  }
}

TodoItemList.propTypes = {
  saveData: PropTypes.func.isRequired,
  saveTag: PropTypes.func.isRequired,
  createTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default TodoItemList;
