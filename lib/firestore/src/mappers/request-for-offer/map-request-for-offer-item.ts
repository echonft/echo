import { FirestoreContractData, FirestoreRequestForOfferItemData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToBigNumber } from '../../utils/mapper/prop-to-big-number'
import { propToMappedDocument } from '../../utils/mapper/prop-to-mapped-document'
import { mapContract } from '../contract'
import { Contract, OfferItem } from '@echo/model'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { BigNumber } from 'ethers'
import { andThen, juxt, pipe } from 'ramda'

export const mapRequestForOfferItem: FirestoreMapper<FirestoreRequestForOfferItemData, OfferItem> = andThen(
  pipe(
    juxt([
      propToMappedDocument<FirestoreContractData, Contract>('contract', mapContract),
      propToBigNumber<BigNumber>('tokenId'),
      propToPromise<number | undefined>('balance')
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<OfferItem>(['contract', 'tokenId', 'balance'])
  )
)
