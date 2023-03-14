import { FirestoreSerializer } from '../../types/serializer/firestore-serializer'
import { serializeWallet } from './serialize-wallet'
import { FirestoreUser } from '@echo/firestore'
import { User } from '@echo/model'
import { castAs, castAsNonNullableProp } from '@echo/utils'
import { allPass, complement, has, ifElse, isNil, map, modify, omit, pipe, prop } from 'ramda'

export const serializeUser: FirestoreSerializer<User, FirestoreUser> = ifElse<[User], FirestoreUser, FirestoreUser>(
  allPass([has('wallets'), pipe(prop('wallets'), complement(isNil))]),
  pipe(castAsNonNullableProp('wallets'), modify('wallets', map(serializeWallet)), (value) =>
    castAs<unknown, FirestoreUser>(value)
  ),
  pipe(omit(['wallets']), (value) => castAs<unknown, FirestoreUser>(value))
)
