/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import TodoItemList from '../../components/TodoItemList';

const basicData = [
  { id: 0, name: 'testing01', tags: ['JavaScript', 'React'] },
  { id: 1, name: 'testing02', tags: [] },
];

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: basicData,
      inputText: '',
    };
  }

  onChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  }

  createData = () => {
    const { data } = this.state;
    const { inputText } = this.state;
    const nextData = data.concat([{ id: data.length + 1, name: inputText, tags: [] }]);

    this.setState({ data: nextData, inputText: '' });
  }

  saveEditData = (editData) => {
    const { data } = this.state;
    const index = data.findIndex(item => item.id === editData.id);
    const nextData = [...data];

    nextData[index] = editData;
    this.setState({ data: nextData });
  }

  createTag = (tagName, listFrom) => {
    const { data } = this.state;
    const index = data.findIndex(item => item.name === listFrom);
    const listData = [...data];

    listData[index].tags.push(tagName);
    this.setState({ data: listData });
  }

  saveTag = (editTag) => {
    const { data } = this.state;
    const index = data.findIndex(item => item.id === editTag.listDataId);
    const listData = [...data];

    listData[index].tags[editTag.tagIndex] = editTag.data;
    this.setState({ data: listData });
  }

  deleteTag = (tagName, listFrom) => {
    const { data } = this.state;
    const index = data.findIndex(item => item.name === listFrom);
    const listData = [...data];
    const tagIndex = listData[index].tags.indexOf(tagName);

    listData[index].tags.splice(tagIndex, 1);
    this.setState({ data: listData });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.createData();
  }

  render() {
    const { inputText, data } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="todoName">
            輸入:
            <input type="text" id="todoName" onChange={this.onChange} value={inputText} />
          </label>
          <button type="submit">加入</button>
          <p>
            input:
            {inputText}
          </p>
        </form>
        <TodoItemList
          saveData={this.saveEditData}
          saveTag={this.saveTag}
          createTag={this.createTag}
          deleteTag={this.deleteTag}
          data={data}
        />
      </div>
    );
  }
}

export default TodoList;
