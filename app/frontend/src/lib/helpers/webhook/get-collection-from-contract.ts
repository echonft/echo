import { getCollectionByAddress } from '@echo/firestore/crud/collection/get-collection-by-address'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import type { Wallet } from '@echo/model/types/wallet'
import { otherwise, pipe } from 'ramda'

export function getCollectionFromContract(contract: Wallet) {
  return pipe(
    getCollectionByAddress,
    otherwise((err) => {
      captureAndLogError(err, { logObject: { contract }, message: 'could not get collection from Firestore' })
      return undefined
    })
  )(contract)
}
