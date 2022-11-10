// import axios from "../axios.js";
import axios from "../axios.js";

const handleLogin = (email ,password) => {
    return axios.post('/auth/login',{
        email,
        password
    })
}

// id = all | _id
const getUser = (id) => {
    return axios.post('/user',{
        id
    });
}

const handleAddNewUser = (data) => {
    return axios.post('user/create',{
        ...data
    });
}

const handleEditUser = (data) => {
    return axios.put('user/edit',{
        ...data
    });
}

const handleDeleteUser = (_id) => {
    console.log(_id);
    return axios.post('/user/delete',{
        _id,
    })
}

export {
    handleLogin,
    getUser,
    handleAddNewUser,
    handleDeleteUser,
    handleEditUser
}