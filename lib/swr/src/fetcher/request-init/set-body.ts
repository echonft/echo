import { assoc } from 'ramda'

export const setBody =
  (body: object) =>
  (requestInit: RequestInit): RequestInit =>
    assoc('body', JSON.stringify(body))(requestInit)
