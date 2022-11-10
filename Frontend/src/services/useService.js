// import axios from "../axios.js";
import axios from "../axios.js";

const handleLogin = (email ,password) => {
    return axios.post('/auth/login',{
        email,
        password
    })
}

const getUser = (id) => {
    return axios.post('/user',{
        id
    });
}

export {
    handleLogin,
    getUser,
}