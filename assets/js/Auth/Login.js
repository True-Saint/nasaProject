import React, {Component} from 'react';
import axios from 'axios';
import LoginComponent from './components/loginComponent';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
    }

    componentDidMount() {

    }
    usernameChangeHandler = (event) => {
        this.setState({username: event.target.value});
    }
    passwordChangeHandler = (event) => {
        this.setState({password: event.target.value});
    }
    login(username,password) {
        axios.post(`https://localhost:8000/api/auth/login_check`, {username: username, password: password}).then(response =>{
            localStorage.setItem('token',response.data.token);
            this.setState({token: response.data.token});
        })

    }

    render() {
        let username = this.state.username;
        let password = this.state.password;

        return(
            <form className="form-signin form-group" encType="">
                Username: <input type="text" className="form-control" onChange={this.usernameChangeHandler} name="_username" placeholder="Username" required="required"/>
                Password: <input type="password" className="form-control"      onChange={this.passwordChangeHandler} name="_password" placeholder="Password" required="required"/>
                <button onClick={event => this.login(username,password)} className="btn btn-sm btn-primary btn-block" type={'button'}>Sign in</button>
            </form>
        )
    }
}
export default Login;
