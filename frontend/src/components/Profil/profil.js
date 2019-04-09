import React, {Component} from 'react'
import userService from '../../_services/userService';

class Profil extends Component{
    constructor(){
        super();
        this.state={
            username: "",
            userID: "",
            userprofile: [],
            allergies: [],
            newAllergy: "",
            newUserprofile:""
        }
        this.auth = new userService();
    }

    // Gets the username from backend and updates the state.
    async updateUsername(){
        try{
            const username = this.auth.getUsername()
            this.setState({username : username});
            console.log('username: ',{username});
            
            }
        catch (e){
            console.log(e);
        }
    }

    // Fetches allergies or creates a new userprofile.
    async updateUserprofile(){
            var res = await fetch(`http://127.0.0.1:8000/api/userprofiles/${this.state.userID}/`, 
                {headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' }
            })
            if(res.status === 404){
                this.createNewUserprofile();
                const res1 = await fetch(`http://127.0.0.1:8000/api/userprofiles`, {
                body: JSON.stringify(this.state.newUserprofile),
                method: 'POST',
                headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
              });
              if (res1.ok) {
                await this.updateUserprofile();
              };
            }
            else{
            const userprofile = await res.json();
            this.setState({
                userprofile : userprofile,
                allergies : userprofile.allergies,
            });
        }
      
        
        
    }

    // Fetches the userID that are used for fetching information from backend.
    async updateUserID(){
        try {
            const res = await fetch('http://127.0.0.1:8000/api/users', {
              headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
            });
            const users = await res.json();
            users.forEach(user => {
                if( user.username == this.state.username){
                    this.setState({userID: user.id})
                }
            });
          } catch (e) {
            console.log(e);
          }
    }

    createNewUserprofile(){
        this.setState({
            newUserprofile: { user: this.state.userID, bio: "", allergies: "" }
        })
    }

    // Function for handling changes in the allergy inputfield.
    handleChange(args){
        this.setState({
            newAllergy: args.target.value,
        });
    }

    deleteAllergies(){
        this.setState({
            newAllergy: ""
        });
        this.handleSubmission();
    }

    formatting(){
        (this.state.newAllergy==="") ? this.state.userprofile.allergies = "" 
        : ((this.state.userprofile.allergies === "") ? this.state.userprofile.allergies += this.state.newAllergy
        : this.state.userprofile.allergies += ", " + this.state.newAllergy);
    }

    // Function for handling submition of allergies. Will be linked to userService, hence backend.
    async handleSubmission(){
        this.formatting();
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/userprofiles/${this.state.userID}/`, {
              body: JSON.stringify(this.state.userprofile),
              method: 'PUT',
              headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
            });
            if (res.ok) {
              await this.updateUserprofile();
            }
            document.getElementById("newAllergy").value = "";
            this.setState({newAllergy : ""});
          } catch (e) {
            console.log(e);
          }
    }


    // Standard function running when component is run. Is used to initialize state.
    async componentDidMount(){
        await this.updateUsername();
        await this.updateUserID();
        await this.updateUserprofile();
    }

    render(){

        return (
            <div className = "container">
                {/* Header shows username. */}
                <div>
                    <h1 className="header">Profilepage</h1>
                    <h3>Username: {this.state.username}</h3>
                </div>
            
                {/* Inputmodule for alergies. */}
                <div className = "new-allergy">
                    {/* Header for the module. */}
                    <h3 className = "login-text">
                    Add new allergy
                    </h3>
                    {/* Inputfield for specifying allergies. */}
                    <input className = "grid-input"
                    name = "allergy"
                    id = "newAllergy"
                    type = "text"
                    placeholder = "newAlergy"
                    onChange={(...a) => this.handleChange(...a)}/>
                    {/* Button for submitting text in above inputfield. */}
                    <button className="add-allergy" onClick = {() => this.handleSubmission() } >Submit</button>
                </div>

                {/* Grid showing an overview of current registered allergies. */}
                <div className = "allergy-list">
                    <h3>Allergies:</h3>
    
                    {this.state.allergies}
                    <div>
                    <button className="delete-allergies" onClick={()=>this.deleteAllergies()} >Delete allergies</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profil;
