import type { HexString } from '@echo/utils/types/hex-string'
import type { ReadContractOfferItems } from '@echo/web3/types/read-contract-offer-items'

export type ReadContractOffer = readonly [
  HexString,
  HexString,
  ReadContractOfferItems,
  ReadContractOfferItems,
  bigint,
  number
]
