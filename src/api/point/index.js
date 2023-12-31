import {get, post, patch, del} from '../../helpers/api_helpers'

export const listGatheringPoints = () => get(`/gathering-points`)

export const createGatheringPoints = (body) => post(`/gathering-points`, body)

export const createTransactionPoint = (gatheringPointId, body) => post(`/gathering-points/${gatheringPointId}/transaction-points`, body)

export const updateTransactionPoint = (transactionPointId, body) => patch(`/transaction-points/${transactionPointId}`, body)

export const deletePoint = (pointId) => del(`/points/${pointId}`)

export const updatePoint = (pointId, body) => patch(`/points/${pointId}`, body)

export const listTransactionPoints = () => get(`/transaction-points`)

export const listGatheringTransactionPoints = (id) => get(`/gathering-points/${id}/transaction-points`)

export const listPoints = () => get(`/points`)

export const getPointInventory = (pointId) => get(`/points/${pointId}/inventory`)

export const getGatherDetail = (id) => get(`/gathering-points/${id}`)

export const getTransactionDetail = (id) => get(`/transaction-points/${id}`)