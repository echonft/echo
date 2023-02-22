import { getFirestoreUserData } from '../../data/user/get-firestore-user-data'
import { ConvertUserOptions } from '../../types/converter'
import { mapUser } from '@echo/firestore/dist/mappers/user'
import { User } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { pipe } from 'ramda'

export const findUserById = (id: string, options: ConvertUserOptions = { wallets: { getDocs: false } }) =>
  pipe(getFirestoreUserData, mapUser, R.fromPromise<User>)(id, options)
