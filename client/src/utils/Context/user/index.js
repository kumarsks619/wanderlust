import React, { createContext, useReducer } from 'react'

import initialState from './initialState'
import reducer from './reducer'
import { userLogin, userLogout } from './actionCreators'


const UserContext = createContext({
    user: null,
    userLogin: () => {},
    userLogout: () => {}
})


const UserProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UserContext.Provider
            value={{
                user: state.user,
                userLogin: (userData) => userLogin(userData, dispatch),
                userLogout: () => userLogout(dispatch)
            }}
        >
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }