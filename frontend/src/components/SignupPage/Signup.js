import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import userService from '../../_services/userService';
import './Signup.css';

class Signup extends Component{
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.auth = new userService();
    this.state = {
      username: "",
      password: ""
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e){
    this.auth.register(this.state.username, this.state.password)
    .then(res =>{
      console.log(res);
      this.props.history.replace('/login');
    })
    .catch(err=>{
      console.error(err);
    })
  }

  render(){
    return (
        <div className="grid">
            <h1 className="register-text">Register</h1>
            <p> Please fill in this form to create an account.</p>
            <div className="name">
              <label htmlFor="uname"><b>Username</b></label>
            
              <input 
              className="text-input"
              name="username" 
              id="text-input" 
              placeholder="username"

              onChange = {(...a) => this.handleChange(...a)}/>
            </div>
            <div>
              <label htmlFor="pword">
                <b>Password</b>
              </label>
              <input 
              className="text-input" 
              name="password" 
              placeholder="password" 
              type = "password"
              
              onChange={(...a)=> this.handleChange(...a)}/>

            </div>
            <div>
              <label htmlFor="rpword"><b>Repeat password</b></label>
              <input 
              className="text-input"  
              placeholder="repeat password"
              type = "password"/>
            </div>
            
            <div className="button">
            <Link to={'/login'} onClick={()=> this.Login}>    
              <button 
              className="cancelbtn"> 
                  Cancel
              </button>
            </Link>
              <button 
              className="signupbtn"
              onClick={()=> this.handleSubmit()}> 
                  Signup
              </button>
            </div>   
        </div>
    );
  }
}
export default Signup

