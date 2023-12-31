import {del, get, post} from '../../helpers/api_helpers'

export const listTransactionShippers = (transactionPointID) => get(`/transaction-points/${transactionPointID}/shippers`)

export const createTransactionShipper = (transactionPointID, params) => post(`/transaction-points/${transactionPointID}/shippers`, params)

export const deleteTransactionShippers = (transactionPointID, shipperID) => del(`/transaction-points/${transactionPointID}/shippers/${shipperID}`)

export const listLeaderInfo = () => get('/leaders')