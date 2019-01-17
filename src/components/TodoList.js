import React from 'react';
import ReactDOM from 'react-dom';

const data = [
    { id: 0, name: "testing01", tags: ["JavaScript", "React"] },
    { id: 1, name: "testing02", tags: [] }
];

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            inputText: '',
            editTarget: null
        }
        this.onChange = this.onChange.bind(this);
        this.changeEdit = this.changeEdit.bind(this);
        this.editData = this.editData.bind(this);
        this.saveEditData = this.saveEditData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleEditBlur = this.handleEditBlur.bind(this);
    }

    onChange(e) {
        this.setState({
            inputText: e.target.value
        });
    }

    changeEdit(item) {
        this.setState({ editTarget: item });
    }

    editData(e) {
        this.setState({
            editTarget: {
                ...this.state.editTarget,
                name: e.target.value
            }
        });
    }

    saveEditData() {
        let index = this.state.data.findIndex(item => item.id == this.state.editTarget.id);
        let data = [...this.state.data];
        data[index] = this.state.editTarget;

        this.setState({ data: data, editTarget: null });
    }

    handleSubmit(e) {
        e.preventDefault();

        const nextData = this.state.data.concat([{ id: this.state.data.length + 1, name: this.state.inputText }]);
        this.setState({ data: nextData, inputText: '' });
    }

    handleKeyPress(e) {
        if (e.key == 'Enter') {
            this.saveEditData()
        }
    }

    handleEditBlur() {
        this.saveEditData();
    }

    render() {
        const editIndex = this.state.editTarget ? this.state.editTarget.id : null;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>輸入:</label>
                    <input type="text" onChange={this.onChange} value={this.state.inputText} />
                    <button>加入</button>
                    <p>input: {this.state.inputText}</p>
                </form>
                <ul>
                    {
                        this.state.data.map((item) => (
                            <li>
                                <div>
                                    {
                                        editIndex == item.id ?
                                            <input type="text"
                                                onChange={this.editData}
                                                onKeyPress={this.handleKeyPress}
                                                onBlur={this.handleEditBlur}
                                                value={this.state.editTarget.name}
                                                autoFocus></input>
                                            : <span onClick={() => { this.changeEdit(item) }}
                                                style={{ display: 'block' }}
                                                key={item.id}>{item.name}</span>
                                    }
                                </div>
                                <div>
                                    <span>tags: </span>
                                    <ul style={{ display: 'inline', paddingLeft: '5px' }}>
                                        {
                                            item.tags.map((data) => (
                                                <li style={{ display: 'inline', paddingLeft: '10px' }}>{data}</li>
                                            ))
                                        }
                                        <li style={{ display: 'inline', paddingLeft: '10px' }}><i class="fas fa-plus-circle"></i></li>
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