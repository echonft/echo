import { FirestoreConverter } from '../../types/converter'
import { ConvertUserOptions } from '../../types/converter/user/convert-user-options'
import { convertToFirestoreData } from '../../utils/converter/convert-to-firestore-data'
import { propToSubcollection } from '../../utils/converter/subcollection/prop-to-subcollection'
import { convertWallet } from './convert-wallet'
import { FirestoreUser, FirestoreUserData, FirestoreWallet, FirestoreWalletData } from '@echo/firestore'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, partialRight, pipe } from 'ramda'

export const convertUser: (options: ConvertUserOptions) => FirestoreConverter<FirestoreUser, FirestoreUserData> = (
  options
) =>
  pipe(
    partialRight(convertToFirestoreData, [['wallets']]),
    juxt([
      propToPromise<string>('id'),
      propToPromise<string>('discordId'),
      propToPromise<string>('nonce'),
      propToSubcollection<FirestoreWallet, FirestoreWalletData>('wallets', options.wallets, convertWallet)
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<FirestoreUserData>(['id', 'discordId', 'nonce', 'wallets'])
  )
