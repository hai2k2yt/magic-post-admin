import {get, post, put} from '../../helpers/api_helpers'

export const getPointStatistic = () => get(`/points/statistic`)

export const getTransactionStatistic = (id) => get(`/transaction-points/${id}/statistic`)

export const getGatheringStatistic = (id) => get(`/gathering-points/${id}/statistic`)

export const getAllStatistic = () => get(`/express-orders/statistic`)
