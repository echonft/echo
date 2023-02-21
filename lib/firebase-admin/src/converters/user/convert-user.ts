import { FirestoreConverter } from '../../types/converter'
import { ConvertUserOptions } from '../../types/converter/user/convert-user-options'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
import { subcollectionProp } from '../../utils/converter/subcollection/subcollection-prop'
import { convertWallet } from './convert-wallet'
import { FirestoreUser, FirestoreUserData, FirestoreWallet, FirestoreWalletData } from '@echo/firestore'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, partialRight, pipe } from 'ramda'

export const convertUser: (options: ConvertUserOptions) => FirestoreConverter<FirestoreUser, FirestoreUserData> = (
  options
) =>
  pipe(
    partialRight(convertSnapshot, [['wallets']]),
    juxt([
      propToPromise<string>('id'),
      propToPromise<string>('discordId'),
      propToPromise<string>('nonce'),
      subcollectionProp<FirestoreWallet, FirestoreWalletData>('wallets', options.wallets, convertWallet)
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<FirestoreUserData>(['id', 'discordId', 'nonce', 'wallets'])
  )
