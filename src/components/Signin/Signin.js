import React, { Component } from 'react';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailInputChange = (event) => {
    this.setState({signInEmail: event.target.value});
  };

  onPasswordInputChange = (event) => {
    this.setState({signInPassword: event.target.value});
  };

  onSigninButtonClick = () => {
    const { onPageChange, loadUser } = this.props;
    const { signInEmail, signInPassword } = this.state;

    fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if(user.id){
          console.log(user);
          loadUser(user);
          onPageChange();
        }
      })
      .catch(err => console.log(err));

  };

  render() {
    const { onEmailInputChange, onPasswordInputChange } = this;

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{"margin-top": '10rem'}}>
        <main className="pa4 black-80">
          <div className="measure">
            <legend className="center f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailInputChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordInputChange}
              />
            </div>
            <div className="tc">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={this.onSigninButtonClick}
              />
            </div>
            <div className="tc lh-copy mt3">
              <p onClick={this.props.goToRegisterPage} className="f6 link dim black db">Register</p>
            </div>
          </div>
        </main>
      </article>
  );
  }
}

export default Signin;