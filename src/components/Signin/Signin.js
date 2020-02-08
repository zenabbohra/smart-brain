import React, {Component} from 'react';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      loading: false,
      signInError: null
    }
  }

  onEmailInputChange = (event) => {
    this.setState({signInEmail: event.target.value});
  };

  onPasswordInputChange = (event) => {
    this.setState({signInPassword: event.target.value});
  };

  // showLoading = (bool) => {
  //   this.setState({loading: bool});
  //   console.log('loading', this.state.loading);
  // };

  onSignInButtonClick = () => {
    const {onPageChange, loadUser} = this.props;
    const {signInEmail, signInPassword} = this.state;
    this.setState({loading: true, signInError: null});

    fetch('https://face-detect-zenab.herokuapp.com/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          loadUser(user);
          onPageChange('home');
        } else {
          const error = user;
          console.log(error);
          this.setState({signInError: error, loading: false});
        }
      })
      .catch(err => {
        console.log('err',err);
        this.setState({signInError: 'Unexpected error, please try again', loading: false});
      });
  };

  render() {
    const {onEmailInputChange, onPasswordInputChange, state: {loading, signInError}} = this;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{"marginTop": '8rem'}}>
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
                value={loading ? "Signing in" : "Sign in"}
                disabled={loading}
                onClick={this.onSignInButtonClick}
              />
            </div>
            <div className="tc lh-copy mt3">
              <p onClick={() => this.props.onPageChange('register')} className="f6 link dim black db">Register</p>
            </div>
            <p className="tc lh-copy mt3">{signInError}</p>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;