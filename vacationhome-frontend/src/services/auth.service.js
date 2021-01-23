import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

// post username, email, password
const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password
    });
};

// POST username  and password & save JWT to local storage
const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password
        })

        .then((response) => {
            if(response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

//remove JWT from localstorage
const logout = () => {
    localStorage.removeItem("user");
};

//user information & JWT gets stored
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export default {
    register,
    login,
    logout,
    getCurrentUser,
};
