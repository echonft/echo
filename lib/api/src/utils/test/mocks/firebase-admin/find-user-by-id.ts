import { idRejecter } from './id-rejecter'
import { idThrower } from './id-thrower'
import { FirestoreUserData, userFirestoreData } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'

export const mockFindUserById = (id: string) => {
  const user = userFirestoreData[id]
  idThrower(id)
  if (idRejecter(id)) {
    return Promise.reject(new Error('not found'))
  }
  return R.fromPromise<FirestoreUserData>(isNil(user) ? Promise.reject(new Error('not found')) : Promise.resolve(user))
}
