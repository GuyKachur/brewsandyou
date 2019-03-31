import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      email: "",
      password: "",
      redirectToHome: false
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

    Accounts.createUser({ email, password }, err => {
      console.log("Signup callback", err);
    });

    this.setState({ redirectToHome: true });
  }

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>Join Brews and You</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)}>
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
          <button>Create Account</button>
        </form>

        <Link to="/login">Already have an account?</Link>
      </div>
    );
  }
}
