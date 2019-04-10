import React from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export default class Login extends React.Component {
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

    Meteor.loginWithPassword({ email }, password, err => {
      if (err) {
        // console.log("Error creating user: ", err);
        this.setState({ error: "Incorrect login" });
      } else {
        console.log(email, "login successful.");
        this.props.location.state
          ? this.props.history.replace(this.props.location.state.prevPath)
          : null;
        // this.setState({ error: "", redirectToHome: true });
      }
    });
  }

  render() {
    console.log("Login props: ", this.props);
    // if (this.state.redirectToHome) {
    //   return <Redirect to="/" />;
    // }
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Login</h1>

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
            <button className="button btn btn-primary">Login</button>
          </form>

          <Link to="/signup" className="lnk-primary">
            Need an account?
          </Link>
        </div>
      </div>
    );
  }
}
