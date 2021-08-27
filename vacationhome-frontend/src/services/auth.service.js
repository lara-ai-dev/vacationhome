import API from './api'

// uses HTTP requests & local storage for user information & JWT

// post username, email and password
function register(username, email, password) {
    return API.post('/auth/signup', {
        username,
        email,
        password,
    })
}

// post username & password - saves JWT to local storage
const login = (username, password) => {
    return API.post('/auth/signin', {
        username,
        password,
    }).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
    })
}

// removes JWT from local storage
const logout = () => {
    localStorage.removeItem('user')
}

//get stored user information (JWT)
const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user'))
}

const AuthService = {
    register,
    login,
    logout,
    getUserFromLocalStorage,
}

export default AuthService



/*import axios from "axios";

// uses HTTP requests & local storage for user information & JWT
const API_URL = "http://localhost:8080/api/auth/";

// post username, email and password
const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

// post username & password - saves JWT to local storage
const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

// removes JWT from local storage
const logout = () => {
    localStorage.removeItem("user");
};

//get stored user information (JWT)
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};*/