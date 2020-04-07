import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/home';
import Services from './pages/services';
import Gallery from './pages/gallery';
import CardPage from './pages/cardPage';
import SignIn from './pages/signIn';
import Register from './pages/register';
import Account from './pages/account';
import Contacts from './pages/contacts';
import Error_404 from './pages/error';

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
            <Route component={Error_404} />
          </Switch>
        <Footer />
      </>
    );
  }
}

export default App;
