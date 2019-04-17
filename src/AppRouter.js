import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoList from './pages/TodoList/index';
import ErrorPage from './pages/ErrorPage';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TodoList} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
