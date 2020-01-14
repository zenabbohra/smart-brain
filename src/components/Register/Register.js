import React, {Component} from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state ={
      registerName: '',
      registerEmail: '',
      registerPassword: ''
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
    fetch('http://localhost:3000/register', {
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
          user.status(400).json('Incorrect inputs')
        }
      })
      .catch(err=> console.log("couldn't register"));
  };

  render() {
    const { onNameInputChange, onEmailInputChange, onPasswordInputChange } = this;

    return(
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{"margin-top": '10rem'}}>
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
                value="Register"
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                onClick={this.onRegisterClick}
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;