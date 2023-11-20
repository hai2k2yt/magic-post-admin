import {get, post} from '../../helpers/api_helpers'

export const createTransactionOrder = (params) => post('/transaction/send', params)

export const createTransactionRequest = (params) => post('/transaction/request', params)

export const confirmTransactionReceipt = (params) => post('/transaction/confirm-receipt', params)

export const createTransactionTransfer = (params) => post('/transaction/create-transfer', params)

export const confirmTransactionTransfer = (params) => post('/transaction/confirm-transfer', params)

export const createTransactionReturn = (params) => post('/transaction/return', params)

export const statisticAccountTransaction = (params) => post('transaction/statistics', params)
