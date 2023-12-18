import {del, get, post} from '../../helpers/api_helpers'

export const createTransactionOrder = (transactionPointID, body) => post(`/transaction-points/${transactionPointID}/express-orders`, body)

export const trackingOrder = (orderId) => get(`/express-orders/${orderId}/tracking-events`)

