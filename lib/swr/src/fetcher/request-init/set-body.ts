import { assoc } from 'ramda'

export const setBody =
  (body: Record<string, unknown>) =>
  (requestInit: RequestInit): RequestInit =>
    assoc('body', JSON.stringify(body))(requestInit)
