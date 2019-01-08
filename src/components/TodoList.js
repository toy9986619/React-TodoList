import React from 'react';
import ReactDOM from 'react-dom';

const data = [
    {id:1 , name: "testing01"}
];

const ListUI = (props) => {
    return (
        <ul>
            {
                props.data.map((item) => {
                    return (
                        <li key={item.id}>{item.name}</li>
                    );
                })
            }
        </ul>
    );
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            inputText: ''
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            inputText: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const nextData = this.state.data.concat([{id: this.state.data.length + 1, name: this.state.inputText}]);
        this.setState({data: nextData, inputText: ''});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>輸入:</label>
                    <input type="text" onChange={this.onChange} value={this.state.inputText} />
                    <button>加入</button>
                    <p>input: {this.state.inputText}</p>
                </form>
                <ListUI data={this.state.data} />
            </div>
        );
    }
}

export default TodoList;