import React from "react";
import {Accounts} from "meteor/accounts-base";
import {Meteor} from "meteor/meteor";

import { NavLink, Redirect} from "react-router-dom";

// import AccountsUIWrapper from "./AccountsUIWrapper.jsx";

export default class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirectToHome: false,
      redirectToLogin: false
    };
  }

  onLogout(){
    // this.setState({redirectToHome: true});
    // this.setState({redirectToHome: true});
    Accounts.logout();
    // return this.props.history.push("/");
  }

  onLogin(){
    // this.setState({redirectToLogin: true});
    // return this.props.history.push("/login");
  }

  render() {
    if (this.state.redirectToLogin){
      // this.setState({redirectToLogin: false});
      return <Redirect to="/login" />;
    }
    if (this.state.redirectToHome){
      // this.setState({redirectToHome: false});
      return <Redirect to="/" />;
    }
    return (
      <div className="">
        <nav className="navbar navbar-expand-md navbar-light">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              Brews & You
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    exact={true}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/search"
                  >
                    Search
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
              </ul>
              <div className="md-form my-0">
                {Meteor.user()
                  ? <NavLink to="/" onClick={this.onLogout.bind(this)}>Logout</NavLink>
                  : <NavLink to="/login">Login</NavLink>
                }
                {/*<AccountsUIWrapper />;*/}
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
