import React from 'react';

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
      editTarget: null,
      editTagTarget: null,
    };
  }

  onChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
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
    const { data } = this.state;
    const { editTarget } = this.state;
    const index = data.findIndex(item => item.id === editTarget.id);
    const nextData = [...data];
    nextData[index] = editTarget;

    this.setState({ data: nextData, editTarget: null });
  }

  changeTag = (listDataId, tagIndex, data) => {
    this.setState({ editTagTarget: { listDataId, tagIndex, data } });
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

  saveTag = () => {
    const { data } = this.state;
    const { editTagTarget } = this.state;
    const index = data.findIndex(item => item.id === editTagTarget.listDataId);
    const listData = [...data];
    listData[index].tags[editTagTarget.tagIndex] = editTagTarget.data;

    this.setState({ data: listData, editTagTarget: null });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { data } = this.state;
    const { inputText } = this.state;
    const nextData = data.concat([{ id: data.length + 1, name: inputText, tags: [] }]);
    console.log(nextData);
    this.setState({ data: nextData, inputText: '' });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleEditBlur();
    }
  }

  handleTagEditEnterPress = (e) => {
    if (e.key === 'Enter') {
      this.handleTagBlur();
    }
  }

  handleEditBlur = () => {
    this.saveEditData();
  }

  handleTagBlur = () => {
    this.saveTag();
  }

  render() {
    const { editTarget, inputText, data } = this.state;
    const editIndex = editTarget ? editTarget.id : null;
    const { editTagTarget } = this.state || null;

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
        <ul>
          {
            data.map(item => (
              <li>
                {
                  editIndex === item.id
                    ? (
                      <input
                        type="text"
                        onChange={this.editData}
                        onKeyPress={this.handleKeyPress}
                        onBlur={this.handleEditBlur}
                        value={editTarget.name}
                        autoFocus
                      />
                    )
                    : (
                      <span
                        onClick={() => { this.changeEdit(item); }}
                        onKeyPress={() => { }}
                        style={{ display: 'block' }}
                        key={item.id}
                        role="menuitem"
                        tabIndex="-1"
                      >
                        {item.name}
                      </span>
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
                            <input
                              type="text"
                              onChange={this.editTag}
                              onKeyPress={this.handleTagEditEnterPress}
                              onBlur={this.handleTagBlur}
                              value={editTagTarget.data}
                              autoFocus
                            />
                          )
                          : (
                            <li style={{ display: 'inline', marginLeft: '5px', border: '1px gray solid' }}>
                              <span
                                onClick={() => { this.changeTag(item.id, index, itemData); }}
                                onKeyPress={() => { }}
                                key={itemData}
                                role="menuitem"
                                tabIndex="-1"
                              >
                                {itemData}
                              </span>
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
      </div>
    );
  }
}

export default TodoList;
