import jwtDecode from 'jwt-decode'

const initialState = {
    user: null,
}

if (localStorage.getItem('USER_TOKEN')) {
    try {
        const decodedToken = jwtDecode(localStorage.getItem('USER_TOKEN'))

        if (decodedToken.exp * 1000 < Date.now()) localStorage.removeItem('USER_TOKEN')
        else
            initialState.user = {
                ...decodedToken,
                userToken: localStorage.getItem('USER_TOKEN'),
            }
    } catch (err) {
        console.log(err.message)
        localStorage.removeItem('USER_TOKEN')
    }
}

export default initialState
