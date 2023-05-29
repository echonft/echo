import { getFirestoreUserData } from '../../data/user/get-firestore-user-data'
import { FirestoreUserData } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { pipe } from 'ramda'

export const findUserById = (id: string) => pipe(getFirestoreUserData, R.fromPromise<FirestoreUserData>)(id)
