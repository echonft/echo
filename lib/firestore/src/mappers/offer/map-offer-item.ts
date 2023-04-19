import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreOfferItemData } from '../../types/model/data/offer/firestore-offer-item-data'
import { propToBigInt } from '../../utils/mapper/prop-to-big-int'
import { propToMappedDocument } from '../../utils/mapper/prop-to-mapped-document'
import { mapContract } from '../contract/map-contract'
import { OfferItem } from '@echo/model'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, pipe } from 'ramda'

export const mapOfferItem: FirestoreMapper<FirestoreOfferItemData, OfferItem> = andThen(
  pipe(
    juxt([propToMappedDocument('contract', mapContract), propToBigInt('tokenId'), propToPromise('balance')]),
    promiseAll,
    zipPromisesToObject(['contract', 'tokenId', 'balance'])
  )
)
