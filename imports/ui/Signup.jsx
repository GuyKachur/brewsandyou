import React from "react";
import { Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      email: "",
      password: "",
      password2: ""
    };
  }

  onChange(event) {
    // console.log("name: ", event.target.name, " value: ", event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.state.email.trim();
    let password = this.state.password.trim();
    let password2 = this.state.password2.trim();

    if (password !== password2){
      return this.setState({
        error: "Passwords must match!"
      });
    }
    if (password.length < 9) {
      return this.setState({
        error: "Password must be more than 8 characters long"
      });
    }

    Accounts.createUser({ email, password }, err => {
      if (err) {
        this.setState({ error: err.reason });
        console.log("Error creating user: ", err);
      } else {
        this.setState({ error: "" });
        console.log("User ", email, " created successfully.");
      }
    });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Signup</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form
            onSubmit={this.onSubmit.bind(this)}
            className="boxed-view__form"
          >
            <input
              onChange={this.onChange.bind(this)}
              value={this.state.emailValue}
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              onChange={this.onChange.bind(this)}
              value={this.state.passwordValue}
              type="password"
              name="password"
              placeholder="Password"
            />
            <input
              onChange={this.onChange.bind(this)}
              value={this.state.password2Value}
              type="password"
              name="password2"
              placeholder="Confirm Password"
            />
            <button className="button">Create Account</button>
          </form>

          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    );
  }
}
