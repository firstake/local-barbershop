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

// CardPage has dynamic title, see this component for details
import {withTitle} from './util';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={withTitle(Home, 'Home')} />
          <Route exact path="/sign-in" component={withTitle(SignIn, 'Sign in')} />
          <Route exact path="/services" component={withTitle(Services, 'Services')} />
          <Route path="/services/:title" component={withTitle(CardPage, 'Loading service...')} />
          <Route path="/gallery" component={withTitle(Gallery, 'Gallery')} />
          <Route path="/contacts" component={withTitle(Contacts, 'Contacts')} />
          <Route path="/register" component={withTitle(Register, 'Register')} />
          <Route path="/account" component={withTitle(Account, 'Account')} />
          <Route component={withTitle(NotFound, '404')} />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default App;
