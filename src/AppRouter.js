import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoList from './pages/TodoList/index';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout';

function AppRouter() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={TodoList} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default AppRouter;
