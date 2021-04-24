import React, { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'


const initialState = {
    admin: null
}


if (localStorage.getItem("ADMIN_TOKEN")) {
    try {
        const decodedToken = jwtDecode(localStorage.getItem("ADMIN_TOKEN"))

        if (decodedToken.username !== "admin")
            throw new Error({
                message: "Unauthorized"
            })        

        if (decodedToken.exp * 1000 < Date.now())
            localStorage.removeItem("ADMIN_TOKEN")
        else
            initialState.admin = {
                ...decodedToken,
                adminToken: localStorage.getItem("ADMIN_TOKEN")
            }
    } catch (err) {
        console.log(err.message)
        localStorage.removeItem("ADMIN_TOKEN")
    }
}


const adminReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                admin: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                admin: null
            }
        default:
            return state
    }
}


const AdminContext = createContext({
    admin: null,
    login: () => {},
    logout: () => {}
})


const AdminProvider = ({ children }) => {
    const [state, dispatch] = useReducer(adminReducer, initialState)

    const login = (adminData) => {
        localStorage.setItem("ADMIN_TOKEN", adminData.adminToken)
        dispatch({
            type: 'LOGIN',
            payload: adminData
        })
    }

    const logout = () => {
        localStorage.removeItem("ADMIN_TOKEN")
        dispatch({
            type: 'LOGOUT'
        })
    }

    return (
        <AdminContext.Provider
            value={{
                admin: state.admin,
                login,
                logout
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}


export { AdminContext, AdminProvider }