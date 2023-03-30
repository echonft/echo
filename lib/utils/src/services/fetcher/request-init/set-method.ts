import { assoc } from 'ramda'

export const setMethod =
  (method: 'GET' | 'POST' | 'PUT' | 'DELETE') =>
  (requestInit: RequestInit): RequestInit =>
    assoc('method', method)(requestInit)
