

class Auth {

    //constructor that check is logged in
    constructor() {
        this.authenticated = localStorage.getItem("islogedin") ? true : false;
    }

    //method that check is logged in
    isLoggedIn() {
        return this.authenticated;
    }

    //method that log in
    login() {
        this.authenticated = true;
        localStorage.setItem("islogedin", true);
    }

    //method that log out
    logout() {
        this.authenticated = false;
        localStorage.removeItem("islogedin");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }


}

export default new Auth();