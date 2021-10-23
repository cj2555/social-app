

class Storage {

    //constructor that get user and token from localStorage
    constructor() {
        this.user = localStorage.getItem('user');
        this.token = localStorage.getItem('token');
    }

    //set user and token to localStorage
    setUserAndTOken(user, token) {
        this.user = user;
        this.token = token;
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
    }

    //get token from localStorage
    getToken() {
        return this.token;
    }
    //get user
    getUser() {
        return this.user;
    }

}

export default new Storage();