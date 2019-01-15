import React from 'react';
import ReactDOM from 'react-dom';

const data = [
    { id: 0, name: "testing01" },
    { id: 1, name: "testing02" }
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
        this.setState({ editTarget:item });
    }

    editData(e) {
        this.setState({
            editTarget: {
                ...this.state.editTarget,
                name: e.target.value
            }
        });
    }

    saveEditData(){
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
        if(e.key == 'Enter'){
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
                            editIndex == item.id ?
                            <input type="text" 
                                onChange={this.editData} 
                                onKeyPress={this.handleKeyPress} 
                                onBlur={this.handleEditBlur}
                                value={this.state.editTarget.name}
                                autoFocus></input>
                            : <li onClick={() => {this.changeEdit(item)}} key={item.id}>{item.name}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default TodoList;