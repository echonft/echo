import { FirestoreUserData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToSubcollection } from '../../utils/mapper/prop-to-subcollection'
import { mapWallet } from './map-wallet'
import { User } from '@echo/model'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, pipe } from 'ramda'

export const mapUser: FirestoreMapper<FirestoreUserData, User> = andThen(
  pipe(
    juxt([
      propToPromise<string>('id'),
      propToPromise<string>('discordId'),
      propToPromise<string>('nonce'),
      propToSubcollection('wallets', mapWallet)
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<User>(['id', 'discordId', 'nonce', 'wallets'])
  )
)
