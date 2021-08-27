import { createContext, useState, useEffect, useContext } from 'react'
import AuthService from 'services/auth.service'

const authContext = createContext()

// custom hook to get the auth object ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const currentUser = AuthService.getUserFromLocalStorage()
        if (currentUser) {
            setUser(currentUser)
        } else {
            setUser(null)
        }
    }, [])

    const logout = () => {
        AuthService.logout()
        setUser(null)
    }

    const getErrorMessage = (error) =>
        error.response?.data?.message || error.message || error.toString()

    const login = async (username, password) => {
        try {
            const user = await AuthService.login(username, password)
            setUser(user)
        } catch (error) {
            throw getErrorMessage(error)
        }
    }

    const signup = async (username, email, password) => {
        try {
            const { data } = await AuthService.register(username, email, password)
            return data
        } catch (error) {
            throw getErrorMessage(error)
        }
    }

    const auth = { user, logout, login, signup }
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
