import {del, get, post, put} from '../../helpers/api_helpers'

export const listUsers = () => get(`/users`)

export const createUser = (body, type) => post(body, `/users?type=${type}`)

export const createTransactionStaff = (transactionPointId, body) => post(`/transaction-points/${transactionPointId}/transaction-staffs`, body)

export const createTransactionLeader = (transactionPointId, body) => post(`/transaction-points/${transactionPointId}/transaction-leader`, body)

export const createGatheringStaff = (gatheringPointId, body) => post(`/gathering-points/${gatheringPointId}/gathering-staffs`, body)

export const createGatheringLeader = (gatheringPointId, body) => post(`/gathering-points/${gatheringPointId}/gathering-leader`, body)

export const deleteUser = (userId) => del(`/users/${userId}`)
//delete transaction staff
export const deleteTStaff = (pointId, userId) => del(`/transaction-points/${pointId}/transaction-staffs/${userId}`)
//delete gathering staff
export const deleteGStaff = (pointId, userId) => del(`/gathering-points/${pointId}/gathering-staffs/${userId}`)
//delete leader
export const deleteLeader = (pointId) => del(`points/${pointId}/leader`)