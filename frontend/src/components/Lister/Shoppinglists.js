import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Shoppinglists.css';
import userService from '../../_services/userService';

class Shoppinglists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      userLists: [],
      users: [],
      newItem: { title: "", description: "", users: [], author: ""}
    };
    this.auth = new userService();
  }

  async _fetchList() {
    try {
      const lists = await this.auth.fetch('http://127.0.0.1:8000/api/');
      this.setState({
        lists
      });
    } catch (e) {
      console.log(e);
    }
  }

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

  async componentDidMount() {
    await this._fetchList();
    await this._fetchUsers();
    this.setUserLists();
    this.setAuthor();
  }

  idFromUsername(user) {
    var result;
    this.state.users.forEach(selectUser => {
      if (selectUser.username === user) {
        result = selectUser.id;
      }
    })
    return result;
  }

  authenticateUser(list){
    if (this.userNameFromId(list.author) === this.auth.getUsername()) {
      return true;
    }
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

  setUserLists() {
    var userList = [];
    var user = this.idFromUsername(this.auth.getUsername());
    this.state.lists.forEach(list => {
      if (list.users.includes(user) || list.author === user) {
        userList.push(list);
      }
    })
    this.setState({
      userLists: userList
    })
  }

  setAuthor(){
    this.state.newItem.author = this.idFromUsername(this.auth.getUsername());
    this.state.newItem.users.push(this.idFromUsername(this.auth.getUsername()));
  }

  updateTitle(title) {
    this.setState({
      newItem: { title, description: this.state.newItem.description, users: this.state.newItem.users, author: this.state.newItem.author}
    });
  }

  updateDescription(description) {
    this.setState({
      newItem: { description, title: this.state.newItem.title, users: this.state.newItem.users, author: this.state.newItem.author}
    });

  }

  delList = (id) => {
    this.setState({ lists: [...this.state.lists.filter(list => list.id !== id)] });
    this.handleDelete(id);

  }

  async handleDelete(id) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), "Content-Type": "application/json" }
      });
      if (res.ok) {
        await this._fetchList();
        await this._fetchUsers();
        this.setUserLists();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async handleSubmit() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/', {
        body: JSON.stringify(this.state.newItem),
        headers: { 'Authorization': "Token " + localStorage.getItem('id_token'), 'Content-Type': 'application/json' },
        method: 'POST',
      });
      if (res.ok) {
        await this._fetchList();
        await this._fetchUsers();
        this.setUserLists();
      }
      document.getElementById("Description").value = ""
      document.getElementById("NewList").value = ""

    } catch (e) {
      console.log(e);
    }

  }

  render() {
    return (
      <div className="container">
        <h2>Welcome, {this.auth.getUsername()}</h2>
        
        <div className="shopping-list"><h3>Dine lister</h3>
        {this.state.userLists.map(items => (

          <div key={items.id} className="listetittel">
            <Link className='list-title' key={items.id} to={`/items/${items.id}`}>
              {items.title}
            </Link>
            <div className="card-title">{items.description}</div>
            {!(this.authenticateUser(items)) ? "" : (
            <button className="xBtn" onClick={this.delList.bind(items, items.id)}>x</button>
            )}
          </div>
        ))}
        </div>
        
        
          <div className="add-list">
            <input placeholder="Name of list" id="NewList" onChange={(v) => this.updateTitle(v.target.value)} />
            <input placeholder="Description" id="Description" onChange={(v) => this.updateDescription(v.target.value)} />
            <button className="submit" onClick={() => this.handleSubmit()}>Add list</button>
          </div>
        
      </div>
    )
  }

}
export default Shoppinglists;