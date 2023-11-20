import {get, post} from '../helpers/api_helpers'

export const login = user => post('/login', user);

export const register = (params) => post('/register', params)

export const forgetPassword = (params) => post('/forget-password', params)

