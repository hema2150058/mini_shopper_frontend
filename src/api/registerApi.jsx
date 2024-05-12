import axios from "axios";

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH"
    }
};

export async function LoginUser(userData) {
    const {data} = await axios.post('http://localhost:8083/signin', userData, config);
    console.log('response data from login is '+ JSON.stringify(data));
    //localStorage( data.username, data.jwtAuthToken);
    console.log('username is ' +data.username + 'token is ' + data.jwtAuthToken );
    
    return data;
}

export async function RegisterNewUser(requestData) {
    const {data} = await axios.post('http://localhost:8083/register',requestData,config);
    console.log('response data from register api is ' + JSON.stringify( data));
    console.log('email is '+data.email);
    return data;
}