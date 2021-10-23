import axios from "axios";
//get env variables


export default axios.create({
    //bring base url from env file
    // baseURL: 'http://127.0.0.1:8000/api',
    baseURL: 'https://vid-mates.com/abir/service_prod/service-app/public/api',
    responseType: "json",

});

// package.json = home = abir / service - app / dashboard