import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import MainTemplate from "./MainTemplate.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import LandingPage from "./LandingPage.jsx";
import CompleteSearchBar from "./CompleteSearchBar.jsx";

const HomeComponent = () => {
  return (
    <div className="container text-center">
      <LandingPage />
    </div>
  );
};

const SearchComponent = () => {
  return (
    <div className="container col-md-8">
      <div className="container text-center">
        <CompleteSearchBar />
      </div>
    </div>
  );
};

const AboutComponent = () => (
  <div className="container text-center">
    <h1>About Beer & You</h1>
    <p>We love good beer and since craft brewerys are opening up regularly, it seemed like we needed a platform to discuss our favorite places.  And with that platform we can also help each other find the best places to drink!</p>
    <p>It is always nice to visit a new city, search the local brew scene, and see what everyone is saying.  Join our community by signing up and start contributing!</p>
  </div>
);

const NotFoundPage = () => (
  <div className="container text-center">
    <h2>Page not found</h2>
    <div>please send help</div>
  </div>
);

const UserAccount = () => {
  return (
    <div className="container text-center">
      <h1>Edit User Account Stuff</h1>
      <p>{Meteor.userId()}</p>
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
