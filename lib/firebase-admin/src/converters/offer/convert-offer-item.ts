import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { refProp } from '../../utils/converter/ref-prop'
import { convertContract } from '../contract/convert-contract'
import { FirestoreOfferItem, FirestoreOfferItemData } from '@echo/firestore'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertOfferItem: FirestoreNestedDocumentConverter<FirestoreOfferItem, FirestoreOfferItemData> = pipe(
  juxt([
    refProp('contract', convertContract),
    propToPromise<string | undefined>('tokenId'),
    propToPromise<number | undefined>('balance')
  ]),
  (promises) => Promise.all(promises),
  zipPromisesToObject<FirestoreOfferItemData>(['contract', 'tokenId', 'balance'])
)
