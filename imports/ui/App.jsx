import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Brewery from "./Brewery.jsx";
import MainTemplate from "./MainTemplate.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import LandingPage from "./LandingPage.jsx";
import CompleteSearchBar from "./CompleteSearchBar.jsx";

const HomeComponent = props => {
  return (
    <div className="container text-center">
      <LandingPage {...props} />
    </div>
  );
};

const SearchComponent = props => {
  return (
    <div className="container col-md-8">
      <div className="container text-center">
        <CompleteSearchBar {...props} />
      </div>
    </div>
  );
};

const AboutComponent = () => (
  <div className="container text-center">
    <h1>About Brews & You</h1>
    <p>
      We love good beer and since craft breweries are opening up regularly, it
      seemed like we needed a platform to discuss our favorite places. And with
      that platform we can also help each other find the best places to drink!
    </p>
    <p>
      It is always nice to visit a new city, search the local brew scene, and
      see what everyone is saying. Join our community by signing up and start
      contributing!
    </p>
  </div>
);

const NotFoundPage = () => (
  <div className="container text-center">
    <h2>Page not found</h2>
    <div>please send help</div>
  </div>
);

const UserAccount = () => {
  console.log("Meteor.user(): ", Meteor.user().emails[0].address);
  return (
    <div className="container text-center">
      <img
        src="https://66.media.tumblr.com/be3a401acea419fb910ab622f4885efe/tumblr_pq6sd09dbb1qa0f2wo2_500.gif"
        alt="beerother-gif"
      />
      <h1>Page Coming Soon</h1>
    </div>
  );
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Meteor.userId() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !Meteor.userId() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/account",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <Router>
        <MainTemplate>
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <ProtectedRoute exact path="/login" component={Login} />
            <ProtectedRoute exact path="/signup" component={Signup} />
            <Route exact path="/brewery/:id" component={Brewery} />
            <Route exact path="/about" component={AboutComponent} />
            <Route exact path="/search" component={SearchComponent} />
            <PrivateRoute exact path="/account" component={UserAccount} />
            <Route component={NotFoundPage} />
          </Switch>
        </MainTemplate>
      </Router>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);
