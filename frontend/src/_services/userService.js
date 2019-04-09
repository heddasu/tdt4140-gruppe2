
export default class userService{

    constructor(domain){
        this.domain = domain || 'http://localhost:3000'
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
    }

    login(username, password){
        return this.fetch(`http://127.0.0.1:8000/api/login`, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            this.setUsername(res.user)
            this.setToken(res.token)
            return Promise.resolve(res)
        })
    }

    register(username, password){
        return this.fetch(`http://127.0.0.1:8000/api/register`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
        },
            body: JSON.stringify({
                username,
                password
            })
        })
    }

    loggedIn(){
        const token = this.getToken()
        return !!token
    }
    
    setUsername(username){
        localStorage.setItem('username', username)
    }

    getUsername(){
        return localStorage.getItem('username')
    }

    setToken(idToken){
        localStorage.setItem('id_token', idToken)
    }

    getToken(){
        return localStorage.getItem('id_token')
    }

    logout(){
        
        localStorage.clear();
    }

    fetch (url, options){
        const headers = {
            'Content-Type':'application/json'
        }
        if (this.loggedIn()){
            headers['Authorization'] = 'Token ' + this.getToken()
        }
        console.log(headers,options,url);
        return fetch(url, {
            headers,
            ...options
        })
        .then(this._checkStatus)
        .then(response => response.json())
    }

    _checkStatus(response){
        if(response.status >= 200 && response.status < 300){
            return response
        }else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}

//const user = await fetch('/api/register?format=json', 
//{ method: 'POST', body: JSON.stringify
//({ password: 'hei', username: 'klomp' }), 
//headers: { 'Content-Type': 'application/json' } });