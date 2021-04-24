import { USER_LOGIN, USER_LOGOUT } from './actionTypes'

export const userLogin = (userData, dispatch) => {
    localStorage.setItem("USER_TOKEN", userData.userToken)
    dispatch({
        type: USER_LOGIN,
        payload: userData
    })
}


export const userLogout = (dispatch) => {
    localStorage.removeItem("USER_TOKEN")
    dispatch({
        type: USER_LOGOUT
    })
}
