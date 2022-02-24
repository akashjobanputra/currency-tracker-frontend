import { FunctionComponent } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from './containers/Dashboard';
import Login from './containers/Login';

interface RouterProps {

}

const Router: FunctionComponent<RouterProps> = () => {
  return (<BrowserRouter basename="/">
    {/* <MyLoader isLoading={isLoading} /> */}

    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  </BrowserRouter>);
}

export default Router;

