import { FirestoreUser, FirestoreUserData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToSubcollection } from '../../utils/mapper/prop-to-subcollection'
import { mapWallet } from './map-wallet'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, pipe } from 'ramda'

export const mapUser: FirestoreMapper<FirestoreUserData, FirestoreUser> = andThen(
  pipe(
    juxt([
      propToPromise<string>('id'),
      propToPromise<string>('discordId'),
      propToPromise<string>('nonce'),
      propToSubcollection('wallets', mapWallet)
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<FirestoreUser>(['id', 'discordId', 'nonce', 'wallets'])
  )
)
