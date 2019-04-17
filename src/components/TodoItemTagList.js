import React from 'react';
import PropTypes from 'prop-types';
import {
  TodoItemInput, TodoItemSpan, TodoItemRow, TodoItemTagRow,
} from './TodoItem';
import NewTagButton from './NewTagButton';

function DeleteTagButton(props) {
  function handleDelete() {
    props.deleteTag(props.data);
  }

  return (
    <span style={{ fontSize: '0.3rem', verticalAlign: 'super' }}>
      <i
        role="button"
        tabIndex="-1"
        onClick={handleDelete}
        onKeyPress={() => { }}
        className="fas fa-backspace fa-2x"
      />
    </span>
  );
}

DeleteTagButton.propTypes = {
  deleteTag: PropTypes.func.isRequired,
  data: PropTypes.string.isRequired,
};

class TodoItemTagList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editTagTarget: null,
    };
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

  handleCreateTag = (tagName) => {
    const { listFrom, createTag } = this.props;

    createTag(tagName, listFrom);
  }

  handleDeleteTag = (tagName) => {
    const { listFrom, deleteTag } = this.props;

    deleteTag(tagName, listFrom);
  }

  handleTagEditEnterPress = (e) => {
    if (e.key === 'Enter') {
      this.saveEditTag();
    }
  }

  render() {
    const { item } = this.props;
    const { editTagTarget } = this.state || null;

    return (
      <div>
        <span>tags: </span>
        <ul style={{ display: 'inline', padding: '0px' }}>
          {
            item.tags.map((itemData, index) => (
              editTagTarget && editTagTarget.listDataId
                === item.id && editTagTarget.tagIndex === index
                ? (
                  <TodoItemRow
                    style={{ display: 'inline', marginLeft: '5px' }}
                  >
                    <TodoItemInput
                      editData={this.editTag}
                      handleKeyPress={this.handleTagEditEnterPress}
                      data={editTagTarget.data}
                    />
                  </TodoItemRow>
                )
                : (
                  <TodoItemTagRow>
                    <TodoItemSpan
                      handleClick={() => { this.changeTag(item.id, index, itemData); }}
                      handleKeyPress={() => { }}
                      key={itemData}
                      data={itemData}
                    />
                    <DeleteTagButton
                      data={itemData}
                      deleteTag={this.handleDeleteTag}
                    />
                  </TodoItemTagRow>
                )
            ))
          }
          <NewTagButton createTag={this.handleCreateTag} />
        </ul>
      </div>
    );
  }
}

TodoItemTagList.propTypes = {
  saveTag: PropTypes.func.isRequired,
  createTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  item: PropTypes.arrayOf(PropTypes.string).isRequired,
  listFrom: PropTypes.string.isRequired,
};

export default TodoItemTagList;
