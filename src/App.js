import React, { Component } from 'react';
import "./styles/main.scss";
import Header from "./components/Header/index";
import { Router, Switch, Route } from 'react-router-dom';
import { HorseList } from './views/horseList';
import { HorseDetail } from './views/horseDetail';
import { history } from './helpers';
import { SiteHeading } from "./config/messages";



class App extends Component {
  render() {
    return (
      <div className="app">
        <Header heading={SiteHeading} />
        <Router history={history}>
          <Switch>
            <Route exact path='/horse-detail/:id' component={HorseDetail} />
            <Route exact path='/' component={HorseList} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
