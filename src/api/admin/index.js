import {get, post} from '../../helpers/api_helpers'

export const getAllTransactionPlace = () => get('/transaction/all')

export const getTransactionPlaceDetail = (id) => get(`transaction/${id}`)

export const getTransactionManager = () => get('/transaction/manager')
export const getAllGatheringPlace = () => get('/gathering/all')

export const getGatheringPlaceDetail = (id) => get(`/gathering/${id}`)

export const getGatheringManager = () => get('/gathering/manager');

export const statisticOrder = (params) => get('/statistics', params)

