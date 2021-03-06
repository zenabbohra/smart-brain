import React, {Component} from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state ={
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      loading: false,
      registerError: null
    }
}

  onNameInputChange = (event) => {
    this.setState({registerName: event.target.value});
  };

  onEmailInputChange = (event) => {
    this.setState({registerEmail: event.target.value});
  };

  onPasswordInputChange = (event) => {
    this.setState({registerPassword: event.target.value});
  };

  onRegisterClick = () => {
    const { onPageChange, loadUser } = this.props;
    const { registerName, registerEmail, registerPassword } = this.state;
    this.setState({loading: true, registerError: null });

    fetch('https://face-detect-zenab.herokuapp.com/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if(user.id){
          onPageChange('home');
          loadUser(user);
        }else{
          const error = user;
          this.setState({loading: false, registerError: error.err});
        }
      })
      .catch((err) => {
        console.log("err", err);
        this.setState({loading: false, registerError: 'Unexpected error occurred, try again'});
      })
      };

  render() {
    const { onNameInputChange, onEmailInputChange, onPasswordInputChange, state: { loading, registerError } } = this;
    return(
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{"marginTop": '8rem'}}>
        <main className="pa4 black-80">
          <div className="measure">
            <legend className="center f4 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="name"
                name="name"
                id="name"
                onChange={onNameInputChange}
              />
            </div>
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
            </div>
            <div className="tc lh-copy mt3">
              <input
                type='submit'
                value={loading ? 'Creating account' : 'Register'}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                disabled={loading}
                onClick={this.onRegisterClick}
              />
            </div>
            <p className="tc lh-copy mt3">{registerError}</p>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;