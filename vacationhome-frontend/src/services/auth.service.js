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


