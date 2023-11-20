import {get, post} from '../../helpers/api_helpers'

export const searchOrderStatus = (params) => get('/order/status', params)
