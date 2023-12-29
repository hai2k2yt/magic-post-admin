import {get, post} from '../helpers/api_helpers'

export const login = (body) => post('/auth/authenticate', body);

// export const register = (params) => post('/register', params)

export const forgetPassword = (params) => post('/forget-password', params)

