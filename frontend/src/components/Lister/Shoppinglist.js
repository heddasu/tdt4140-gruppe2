import React, { Component } from 'react';
import './Shoppinglists.css';
import userService from '../../_services/userService';
import './Shoppinglist.css';

class Shoppinglist extends Component {

  // First thing that happens when "this" is defined. State keeps info for the object.
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      listView: [],
      groceries: [],
      users: [],
      user: [],
      comments: [],
      relatedComments: [],
	  userprofiles: [],
	  relatedUserprofiles: [],
      isUserAuth: false,
      newItem: { title: "", description: "", completed: false, author: "" },
      commentItem: { comment: "", author: "" },
    };
    this.auth = new userService();
  }

  // Fetches groceries and adds them to state 
  async _fetchGroceries() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/groceries', {
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      const lists = await res.json();
      this.setState({
        lists
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Fetches allergies
  async _fetchUserprofiles(){
    try{
        const res = await fetch(`http://127.0.0.1:8000/api/userprofiles`, 
            {headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' }
        })
        const userprofiles = await res.json();
        this.setState({
            userprofiles : userprofiles,
        });
        
    }
    catch (e){
        console.log(e);
    }
}


  // Fetches lists and adds them to state
  async _fetchList(id) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/${id}/`, {
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      const listView = await res.json();
      this.setState({
        listView: listView
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Fetches users and adds them to state
  async _fetchUsers() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/users', {
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      const users = await res.json();
      this.setState({
        users: users
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Fetches comments and adds them to state 
  async _fetchComments() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/comments', {
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      const comments = await res.json();
      this.setState({
        comments: comments
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Functions that executes when page is rendered
  async componentDidMount() {
    await this._fetchGroceries();
    await this._fetchList(window.location.pathname.match(/\d+/)[0]);
    await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
	await this._fetchComments();
	await this._fetchUserprofiles();
	this.setRelatedUserprofiles();
	this.groceryID();
    this.commentID();
    this.authenticateUser();
    this.setAuthor();
  }

  //Sets author to grocery when new grocery is made
  setAuthor(){
    this.state.newItem.author = this.idFromUsername(this.auth.getUsername());
    this.state.commentItem.author = this.idFromUsername(this.auth.getUsername());
  }

  setRelatedUserprofiles(){
	this.setState({
		relatedUserprofiles: []
	})
	this.state.userprofiles.forEach(userprofile => {
		this.state.listView.users.forEach(member => {
			if (userprofile.user === member){
				this.state.relatedUserprofiles.push(userprofile);
			}})});
  }

  // Checks if user is author of list
  authenticateUser(){
    if (this.userNameFromId(this.state.listView.author) === this.auth.getUsername()) {
      this.setState({
        isUserAuth: true
      });
      this.datalistfunction();
    }
  }

  // Checks if user is author of grocery
  authenticateUserGrocery(grocery){
    if (this.userNameFromId(grocery.author) === this.auth.getUsername()) {
      return true;
    }
  }

  // Makes the search field show the users that exist when a user start writing
  datalistfunction() {
    var ServerResponse = [];
    this.state.users.forEach(selectUser => {
      ServerResponse.push(selectUser.username)
    })
    var datalist = document.getElementById('names');

    document.getElementById('myInput').addEventListener('keyup', function () {
      if (this.value.length === 0) {
        return;
      }

      // Send Ajax request and loop of its result

      datalist.textContent = '';
      for (var i = 0; i < ServerResponse.length; i++) {
        if (ServerResponse[i].indexOf(this.value) !== 0) {
          continue;
        }
        var option = document.createElement('option');
        option.value = ServerResponse[i];
        datalist.appendChild(option);
      }
    });
  }

  // Sets user to add to list
  setUser(user) {
    this.setState({
      user: this.idFromUsername(user)
    })
  }

  // Takes in user and returns the users id
  idFromUsername(user) {
    var result;
    this.state.users.forEach(selectUser => {
      if (selectUser.username === user) {
        result = selectUser.id;
      }
    })
    return result;
  }

  // Takes in id and returns the users username
  userNameFromId(user) {
    var result;
    this.state.users.forEach(selectUser => {
      if (selectUser.id === user) {
        result = selectUser.username;
      }
    })
    return result;
  }

  // Gives users apart of this list
  users(userlist) {
    var result = [];
    this.state.users.forEach(selectUser => {
      userlist.forEach(user => {
        if (selectUser.id === user) {
          result.push(selectUser.username);
        }
      })
    })
    return result;
  }

  // Updates the state when something is written in input field
  updateTitle(title) {
    this.setState({
      newItem: { title, description: this.state.newItem.description, author: this.state.newItem.author }
    });
  }

  // Same as over
  updateDescription(description) {
    this.setState({
      newItem: { description, title: this.state.newItem.title, author: this.state.newItem.author }
    });
  }

  // Updates the comment when something is written in input field
  updateComment(comment) {
    this.setState({
      commentItem: { comment, author: this.state.commentItem.author }
    });
  }


  // Updates the state of which groceries exist in the list
  foreignKey(id) {
    this.state.listView.groceries.push(id);
    this.handleForeignKey();
  }

  foreignKeyComment(id) {
    this.state.listView.comments.push(id);
    this.handleForeignKey();
  }

  // Updates state of completed groceries and executes handlemarkings 
  markComplete = (id) => {
    this.setState({
      lists: this.state.lists.map(grocery => {
        if (grocery.id === id) {
          grocery.completed = !grocery.completed;
          if (grocery.completed === true){
            grocery.completedBy = this.idFromUsername(this.auth.getUsername());
          } else {
            grocery.completedBy = "";
          }

          this.handleMarkings(grocery, id);
     
        }
        return grocery;
      })
    })
  }


  // Deletes groceries and executes handleDelete
  delGrocery = (id) => {
    this.setState({ lists: [...this.state.lists.filter(grocery => grocery.id !== id)] });
    this.handleDelete(id);

  }

  // Function to get the correct Ids to the list
  groceryID() {
    var result = [];
    this.state.lists.forEach(grocery => {
      this.state.listView.groceries.forEach(Id => {
        if (grocery.id === Id) {
          result.push(grocery)
        }
      }
      )
    })
    this.setState({
      groceries: result
    });
  }

  commentID() {
    var result = [];
    this.state.comments.forEach(comments => {
      this.state.listView.comments.forEach(Id => {
        if (comments.id === Id) {
          result.push(comments)
        }
      }
      )
    })
    this.setState({
      relatedComments: result
    });
  }


  // Calls api and deletes grocery in backend
  async handleDelete(id) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/groceries/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        await this._fetchGroceries();
        await this._fetchList(window.location.pathname.match(/\d+/)[0]);
        await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
        this.groceryID();
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Calls api and adds grocery to backend
  async handleSubmit() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/groceries', {
        body: JSON.stringify(this.state.newItem),
        method: 'POST',
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        await this._fetchGroceries();
        await this._fetchList(window.location.pathname.match(/\d+/)[0]);
        await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
        this.groceryID();
        this.foreignKey(this.state.lists.slice(-1)[0].id);
      }
      document.getElementById("NewGrocery").value = ""
      document.getElementById("Description").value = ""
    } catch (e) {
      console.log(e);
    }

  }


  // Calls api and adds comment to backend
  async handleCommentSubmit() {
    console.log(this.state.commentItem)
    try {
      const res = await fetch('http://127.0.0.1:8000/api/comments', {
        body: JSON.stringify(this.state.commentItem),
        method: 'POST',
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        await this._fetchComments();
        await this._fetchGroceries();
        await this._fetchList(window.location.pathname.match(/\d+/)[0]);
        await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
        this.commentID();
        this.foreignKeyComment(this.state.comments.slice(-1)[0].id)
      }
      document.getElementById("NewComment").value = ""
      //document.getElementById("Description").value = ""
    } catch (e) {
      console.log(e);
    }

  }


  async deleteComment(comment){
    console.log(comment)
    console.log(this.state.relatedComments)
    console.log(this.state.relatedComments[0])
    var id;
    for( var i = 0; i < this.state.relatedComments.length; i++){ 
      if ( this.state.relatedComments[i] === comment) {
        id=this.state.relatedComments[i].id
        this.state.relatedComments.splice(i, 1); 
      }
    }
    console.log(id)
    console.log(this.state.relatedComments)
    console.log(localStorage.getItem('id_token'))
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/comments/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        await this._fetchComments();
        await this._fetchGroceries();
        await this._fetchList(window.location.pathname.match(/\d+/)[0]);
        await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
        this.commentID();
      }
    } catch (e) {
      console.log(e);
    }


  }


  // Makes sure the correct groceries get handled
  async handleForeignKey() {
    try {
      var id = window.location.pathname.match(/\d+/)[0];
      const res = await fetch(`http://127.0.0.1:8000/api/${id}/`, {
        body: JSON.stringify(this.state.listView),
        method: 'PUT',
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        await this._fetchGroceries();
        await this._fetchList(window.location.pathname.match(/\d+/)[0]);
        await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
        this.groceryID();
        this.commentID();
      }
    } catch (e) {
      console.log(e);
    }

  }

  

  // Calls api and adds user to list
  async addUser() {
    this.state.listView.users.push(this.state.user);
    try {
      var id = window.location.pathname.match(/\d+/)[0];
      const res = await fetch(`http://127.0.0.1:8000/api/${id}/`, {
        body: JSON.stringify(this.state.listView),
        method: 'PUT',
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        this.componentDidMount();
      }
    } catch (e) {
      console.log(e);
    }
    document.getElementById("myInput").value=""

  }

    //Calls api and deletes user from list
 async deleteUser(user){
   console.log(user)
  var userid=this.idFromUsername(user)

  for( var i = 0; i < this.state.listView.users.length; i++){ 
    if ( this.state.listView.users[i] === userid) {
      this.state.listView.users.splice(i, 1); 
    }
  }
   console.log(this.state.listView)
   console.log(this.state.newItem.author)
   
  
   try {
    var id = window.location.pathname.match(/\d+/)[0];
    console.log(id)
    const res = await fetch(`http://127.0.0.1:8000/api/${id}/`, {
      body: JSON.stringify(this.state.listView),
      method: 'PUT',
      headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
    });
    if (res.ok) {
		this.componentDidMount();
    }
  } catch (e) {
    console.log(e);
  }
  if(user===this.auth.getUsername()){
    this.props.history.replace('/');
  }
  
 }
  // Calls api and marks a grocery
  async handleMarkings(grocery, id) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/groceries/${id}/`, {
        body: JSON.stringify(grocery),
        method: 'PUT',
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        await this._fetchGroceries();
        await this._fetchList(window.location.pathname.match(/\d+/)[0]);
        await this._fetchUsers(window.location.pathname.match(/\d+/)[0]);
        this.groceryID();
      }
    } catch (e) {
      console.log(e);
    }

  }
 /* myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }*/

  render() {
    return (
      <div className="container-list">
        <div className="title-box">
          <h1 className="title">{this.state.listView.title}</h1>
        </div>
        
        

        <div className="grocery-list"> 
        {this.state.groceries.map(items => (
          <div key={items.id} className="grocerytittel">
            <p style={{ textDecoration: items.completed ? 'line-through' : 'none' }} className="cardtitle">
              <input name="checkbox" type="checkbox" onChange={this.markComplete.bind(items, items.id)} />{' '}
              {items.title}
            </p>
            {!(items.completed) ? "":(
            <p className="comment">{"Kjøpt av "+ this.userNameFromId(items.completedBy)}</p>
            )}

            {!(items.completed==false) ? "":(
              <p className="no-comment">{"Kjøpt av "} ingen</p>
            )}
            <p className="card-text">{items.description}</p>
            {!(this.state.isUserAuth || this.authenticateUserGrocery(items)) ? "" : (
                <button className="delete-grocery" onClick={this.delGrocery.bind(items, items.id)}>x</button>
              )}
              
          </div>
        ))}
        </div>


        <div className="add-grocery">
            <input placeholder="New grocery" id="NewGrocery" onChange={(v) => this.updateTitle(v.target.value)} />
            <input placeholder="Description" id="Description" onChange={(v) => this.updateDescription(v.target.value)} />
            <button className="submit" onClick={() => this.handleSubmit()}>Add Grocery</button>
        </div>


        <div className="members">
          <h5>Admin:</h5>
          <div className="member-users">{this.userNameFromId(this.state.listView.author)}</div>
          <h5>Members:</h5>
          {this.users(this.state.listView.users).map(user => (
            <div className="member-users">
            <div key={user.id}>{user}</div>
              {!((this.state.isUserAuth || this.auth.getUsername()===user) && this.idFromUsername(user)!==this.state.listView.author ) ? "" : (
              <button className="delete-grocery" onClick={()=>this.deleteUser(user)}>x</button>)}
          </div>
          ))}
        </div>

       

        {!(this.state.isUserAuth) ? "" : (
          <div className="search-user">
            <input id="myInput" list="names" onChange={(v) => this.setUser(v.target.value)} placeholder="Search for users.." />
            <datalist id="names"></datalist>
            <button className="submit" onClick={() => this.addUser()}>Add User</button>
          </div>
        )}

        <div className='allergi'>
        	<h5>Allergies:</h5>
			{this.state.relatedUserprofiles.map(userprofile => (
				<p>{userprofile.allergies}</p>
			
			))}
			{console.log("Her:"+this.state.relatedUserprofiles)}
        
        </div>
        


         {
        <div className="comments">
        <h4>Comments</h4>
        {this.state.relatedComments.map(items => (
          <div className="commentbox">
           
           <div className='comment-name'>  
            <h6 className="comment-username">{this.userNameFromId(items.author)}</h6> <br />
           </div>
           
           <div className='comment-line'><br />
           <p className='comment-comment'>{items.comment} {!(this.state.isUserAuth || this.auth.getUsername()===this.userNameFromId(items.author)) ? "" : (
                <button className="delete-comment" onClick={()=>this.deleteComment(items)} >Delete</button>
           )} </p>
           
           </div>
           
          </div>

        ))}
        
        <div className="commentbox">
          <div className="comment-username">
            <h6>{this.auth.getUsername()}</h6><br />
          </div>
          <br />
          <div>
            <input type="text" placeholder="Write a new comment" id="NewComment" onChange={(v) => this.updateComment(v.target.value)}/>
          </div> 
        </div>
        <button className="submit" onClick={() => this.handleCommentSubmit()}>Comment</button>

           </div>}
           

      </div>

    )
  }

}
export default Shoppinglist;