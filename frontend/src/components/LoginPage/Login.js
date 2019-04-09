import React, {Component} from 'react'
import './login.css';
import userService from '../../_services/userService';
import { Link } from 'react-router-dom';
class Login extends Component{
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new userService();
        this.state = {
            username: "",
            password: ""
        }
    }

    stateListener(){
        return this.state.username;
    }

    componentWillMount(){
        if(this.Auth.loggedIn()){
          this.Auth.props.history.replace('/');
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFormSubmit(e){
        
        this.Auth.login(this.state.username, this.state.password)
        .then(res =>{
            console.log(res);
            this.props.history.replace('/');
        })
        .catch(err =>{
            console.error(err);
        })
    }

    render(){
        return (
            <div className="grid">
                <h1 className="login-text">Login</h1>
                <div>
                    <div>
                    <b>Username</b>
                    <input 
                    className="grid-input" 
                    name="username"
                    type="text"
                    placeholder="username"
                    onChange={(...a) => this.handleChange(...a)}/>
                    </div>

                    <div className="password-box">
                        <b>Password</b>
                        <input
                        className="grid-input" 
                        name="password" 
                        type = "password"
                        placeholder="password"
                        onChange={(...a) => this.handleChange(...a)}/>
                    </div>
                    <br />
                    <div>
                    <button
                        className="submit-button"
                        onClick={() => this.handleFormSubmit()}
                        >
                            Login
                        </button>
                    </div>
                </div>
                <div className="signup-link">
                <Link to={'/signup'} onClick={()=> this.Signup}>Signup here</Link>
                </div>
            </div>
            

        )
    }
}
export default Login;

