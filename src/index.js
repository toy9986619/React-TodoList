import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h1>TODO List</h1>
                <TodoList />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));