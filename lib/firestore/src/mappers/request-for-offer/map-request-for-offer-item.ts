import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreRequestForOfferItemData } from '../../types/model/data/request-for-offer/firestore-request-for-offer-item-data'
import { propToBigInt } from '../../utils/mapper/prop-to-big-int'
import { propToMappedDocument } from '../../utils/mapper/prop-to-mapped-document'
import { mapContract } from '../contract/map-contract'
import { OfferItem } from '@echo/model'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, pipe } from 'ramda'

export const mapRequestForOfferItem: FirestoreMapper<FirestoreRequestForOfferItemData, OfferItem> = andThen(
  pipe(
    juxt([propToMappedDocument('contract', mapContract), propToBigInt('tokenId'), propToPromise('balance')]),
    promiseAll,
    zipPromisesToObject<OfferItem>(['contract', 'tokenId', 'balance'])
  )
)
