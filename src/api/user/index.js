import {del, get, post, put} from '../../helpers/api_helpers'

export const listUsers = () => get(`/users`)

export const createUser = (body, type) => post(body, `/users?type=${type}`)

export const createTransactionStaff = (transactionPointId, body) => post(`/transaction-points/${transactionPointId}/transaction-staffs`, body)

export const createTransactionLeader = (transactionPointId, body) => post(`/transaction-points/${transactionPointId}/transaction-leader`, body)

export const createGatheringStaff = (gatheringPointId, body) => post(`/gathering-points/${gatheringPointId}/gathering-staffs`, body)

export const createGatheringLeader = (gatheringPointId, body) => post(`/gathering-points/${gatheringPointId}/gathering-leader`, body)

export const deleteUser = (userId) => del(`/users/${userId}`)
