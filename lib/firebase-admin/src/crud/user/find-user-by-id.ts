import { getFirestoreUserData } from '../../data/user/get-firestore-user-data'
import { mapUser } from '@echo/firestore'
import { User } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { pipe } from 'ramda'

export const findUserById = (id: string) => pipe(getFirestoreUserData, mapUser, R.fromPromise<User>)(id)
