import { FirestoreRequestForOfferItem, FirestoreRequestForOfferItemData } from '../../types'
import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { refProp } from '../../utils/converter/ref-prop'
import { convertContract } from '../contract/convert-contract'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertRequestForOfferItem: FirestoreNestedDocumentConverter<
  FirestoreRequestForOfferItem,
  FirestoreRequestForOfferItemData
> = pipe(
  juxt([
    refProp('contract', convertContract),
    propToPromise<string | undefined>('tokenId'),
    propToPromise<number | undefined>('balance')
  ]),
  promiseAll,
  zipPromisesToObject<FirestoreRequestForOfferItemData>(['contract', 'tokenId', 'balance'])
)
