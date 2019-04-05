import React from "react";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";

export default class NavBar extends React.Component {
  onLogout() {
    Accounts.logout();
  }

  render() {
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
                {Meteor.user() ? (
                  <span>
                    <Dropdown role="menu">
                      <Dropdown.Toggle
                        className="p-1 m-0"
                        id="dropdown-custom-1"
                        variant="outline-primary"
                      >
                        <img
                          className="bg-light rounded-circle"
                          height="30px"
                          width="30px"
                          src={`https://robohash.org/${
                            Meteor.users.findOne(Meteor.userId()).emails[0]
                              .address
                          }`}
                          alt={
                            Meteor.users.findOne(Meteor.userId()).emails[0]
                              .address
                          }
                        />
                      </Dropdown.Toggle>
                      <Dropdown.Menu alignRight className="super-colors">
                        <LinkContainer to="/account">
                          <Dropdown.Item as="button" role="menuitem">
                            Account
                          </Dropdown.Item>
                        </LinkContainer>
                        <Dropdown.Item
                          as="button"
                          role="menuitem"
                          onClick={this.onLogout.bind(this)}
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                ) : (
                  <span>
                    <NavLink className="btn" to="/login">
                      Login
                    </NavLink>{" "}
                    <NavLink className="btn btn-primary" to="/signup">
                      Signup
                    </NavLink>
                  </span>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
