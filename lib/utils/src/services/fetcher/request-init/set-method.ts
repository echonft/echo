import { assocPath } from 'ramda'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
export const setMethod = (method: HttpMethod) => assocPath<HttpMethod, RequestInit>(['method'], method)
