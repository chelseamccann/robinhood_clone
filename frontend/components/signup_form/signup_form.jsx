import React from 'react';
import { Link } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state).then(() => this.props.history.push('/'))
  }

  renderErrors(){
    return (
      <ul className="errors"> 
      {this.props.errors.map((error, idx) => (
        <li key={idx}>
          {error[idx]}
        </li>
      ))}
      </ul>
    )
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className="sign-up-container">
          <div className="sign-up-form">

            <h2>Make Your Money Move</h2>
            <p>CacheFlow lets you invest in companies you love, commission-free.</p>

            <input
              type="text"
              value={this.state.firstName}
              onChange={this.update("firstName")}
              placeholder={" First Name"}
              />
            <br />

            <input
              type="text"
              value={this.state.lastName}
              onChange={this.update("lastName")}
              placeholder={" Last Name"}
              />
            <br />

            <input
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder={" Email address"}
              />
            <br />
            <label>Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder={" Password (min. 10 characters)"}
              />

            {this.renderErrors()}
            

            <Link to="/login"><input type="submit" value="Continue" /></Link>
            <p>Already started? <a href="">Log in to complete your application.</a></p>
          </div>
        </form>
      </>
    )
  }
}
export default SignupForm;