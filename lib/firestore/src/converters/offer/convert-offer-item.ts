import { FirestoreConverter, FirestoreOfferItem, FirestoreOfferItemData } from '../../types'
import { refProp } from '../../utils/converter/ref-prop'
import { convertContract } from '../contract/convert-contract'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertOfferItem: FirestoreConverter<FirestoreOfferItem, FirestoreOfferItemData> = pipe(
  juxt([
    refProp('contract', convertContract),
    propToPromise<string | undefined>('tokenId'),
    propToPromise<number | undefined>('balance')
  ]),
  (promises) => Promise.all(promises),
  zipPromisesToObject<FirestoreOfferItemData>(['contract', 'tokenId', 'balance'])
)
