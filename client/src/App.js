import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import CardPage from './pages/CardPage';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Account from './pages/Account';
import Contacts from './pages/Contacts';
import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/services" component={Services} />
          <Route path="/services/:title" component={CardPage} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/register" component={Register} />
          <Route path="/account" component={Account} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default App;
