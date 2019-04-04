import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import MainTemplate from "./MainTemplate.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import { Redirect } from "react-router-dom";
// import { createBrowserHistory } from "history";
import { HTTP } from "meteor/http";

import { withTracker } from "meteor/react-meteor-data";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div className="container text-center">
      {Meteor.user() ? <div>Hello </div> : <p>Please log in</p>}
    </div>
  );
};

const SearchComponent = () => {
  return (
    <div className="container col-md-8 col-lg-6">
      <div className=" container text-center">
        {Meteor.user() ? <div>search </div> : <p>Please log in</p>}
      </div>
    </div>
  );
};

const AboutComponent = () => (
  <div className="container text-center">
    <p>About page</p>
  </div>
);

const NotFoundPage = () => (
  <div>
    <h2>Page not found</h2>
    <div>please send help</div>
  </div>
);

const UserAccount = () => {
  // const user = Meteor.users.findOne(Meteor.userId());
  // const email = user.emails[0].address;
  console.log("Email: ", Meteor.users.findOne(Meteor.userId()).emails[0].address);
  return (
    <div>
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
