import {del, get, post} from '../../helpers/api_helpers'

export const createOrder = (transactionPointID, body) => post(`/transaction-points/${transactionPointID}/express-orders`, body)

export const trackingOrder = (orderId) => get(`/express-orders/${orderId}/tracking-events`)

export const getOrder = (id) => get(`/express-orders/${id}`)

export const getStatisticOrders = () => get(`/express-orders/statistics`)
