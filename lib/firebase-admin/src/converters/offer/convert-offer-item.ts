import { refProp } from '../../utils/converter/ref-prop'
import { convertContract } from '../contract/convert-contract'
import { FirestoreOfferItem, FirestoreOfferItemData } from '@echo/firestore'
import { FirestoreNestedDocumentConverter } from '@echo/firestore/dist/types/converter/firestore-nested-document-converter'
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
