import React, { Component } from 'react';
import "./styles/main.scss";
import Header from "./components/Header/index";
import { Router, Switch, Route} from 'react-router-dom';
import { HorseList } from './views/horseList';
import { HorseDetail } from './views/horseDetail';
import { history } from './helpers';
import { SiteHeading } from "./config/messages";



class App extends Component {
  render() {
    return (
      <div className="app">
        <Router history={history}>
          <div>
            <Header heading={SiteHeading} />
              <Switch>
                <Route exact path='/horse-detail/:id' component={HorseDetail} />
                <Route exact path='/' component={HorseList} />
              </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
