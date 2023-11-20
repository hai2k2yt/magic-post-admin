import {get, post} from '../../helpers/api_helpers'

export const getStatisticOrder = (params) => get('/gathering/statistics', params)

export const getGatheringStaffList = (params) => get('/gathering/staff/all', params)

export const getGatheringStaffDetail = id => get(`/gathering/staff/${id}`)

export const acceptOrderFromTransaction = params => post('/gathering/order/accept-transaction', params)

export const acceptOrderFromGathering = params => post('/gathering/order/accept-gathering', params)
export const createOrderTransaction = params => post('gathering/transaction', params);