import {get, post, put} from '../../helpers/api_helpers'

export const confirmP2PTransactionArrival = (transactionPointId, p2pTransportOrderId) => put(`/transaction-points/${transactionPointId}/p2p-transport-orders/${p2pTransportOrderId}/confirm-arrival`)

export const confirmP2CTransactionDelivery = (transactionPointId, p2cTransportOrderId, expressOrderId, body) => put(`/transaction-points/${transactionPointId}/p2c-transport-orders/${p2cTransportOrderId}/express-orders/${expressOrderId}/confirm-delivery`, body)

export const cancelP2CTransaction = (transactionPointId, p2cTransportOrderId, expressOrderId, body) => put(`/transaction-points/${transactionPointId}/p2c-transport-orders/${p2cTransportOrderId}/express-orders/${expressOrderId}/cancel`, body)

export const confirmP2PGatheringArrival = (gatheringPointId, p2pTransportOrderId, body) => put(`/gathering-points/${gatheringPointId}/p2p-transport-orders/${p2pTransportOrderId}/confirm-arrival`, body)

export const listP2PTransactionOrders = (transactionPointId) => get(`/transaction-points/${transactionPointId}/p2p-transport-orders`)

export const createP2PTransactionOrder = (transactionPointId, body) => post(`/transaction-points/${transactionPointId}/p2p-transport-orders`, body);

export const listP2CTransactionOrders = (transactionPointId) => get(`/transaction-points/${transactionPointId}/p2c-transport-orders`)

export const createP2CTransactionOrder = (transactionPointId, body) => post(`/transaction-points/${transactionPointId}/p2c-transport-orders`, body);

export const listP2PGatheringOrders = (gatheringPointId) => get(`/gathering-points/${gatheringPointId}/p2p-transport-orders`)

export const createP2PGatheringOrder = (gatheringPointId, body) => post(`/gathering-points/${gatheringPointId}/p2p-transport-orders`, body);

export const listP2POrders = (pointId) => get(`/points/${pointId}/p2p-transport-orders`);

export const getP2PExpress = (p2pId) => get(`/p2p-transport-orders/${p2pId}/express-orders`);

export const getP2CExpress = (p2cId) => get(`/p2c-transport-orders/${p2cId}/express-orders`);
