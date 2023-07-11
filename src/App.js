import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Album from './pages/Album/index';
import Favorites from './pages/Favorites/index';
import Login from './pages/Login/index';
import NotFound from './pages/NotFound/index';
import Profile from './pages/Profile/index';
import ProfileEdit from './pages/ProfileEdit/index';
import Search from './pages/Search/index';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="/search" component={ Search } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
