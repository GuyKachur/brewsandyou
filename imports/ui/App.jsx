import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import MainTemplate from "./MainTemplate.jsx";

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
            <Route exact path="/about" component={AboutComponent} />
            <Route exact path="/search" component={SearchComponent} />
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
