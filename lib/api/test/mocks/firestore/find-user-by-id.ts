import { userFirestoreData } from '../user-firestore-data'
import { idRejecter, idThrower } from '@echo/utils'
import { isNil } from 'ramda'

export const mockFindUserById = (id: string) => {
  const user = userFirestoreData[id]
  idThrower(id)
  if (idRejecter(id)) {
    return Promise.reject('not found')
  }
  if (isNil(user)) {
    return Promise.reject('not found')
  }
  return Promise.resolve(user)
}
