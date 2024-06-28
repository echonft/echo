import { formatAddress } from '@echo/web3/helpers/format-address'
import { mapReadContractOfferItemsToContractOfferItems } from '@echo/web3/mappers/map-read-contract-offer-items-to-contract-offer-items'
import type { ContractOffer } from '@echo/web3/types/contract-offer'
import type { ReadContractOffer } from '@echo/web3/types/read-contract-offer'
import { applySpec, nth, pipe } from 'ramda'

export function mapReadContractOfferToContractOffer(readOffer: ReadContractOffer): ContractOffer {
  // FIXME Typing
  return applySpec({
    sender: pipe(nth(0), formatAddress),
    receiver: pipe(nth(1), formatAddress),
    senderItems: pipe(nth(2), mapReadContractOfferItemsToContractOfferItems),
    receiverItems: pipe(nth(3), mapReadContractOfferItemsToContractOfferItems),
    expiration: pipe(nth(4), Number),
    state: nth(5)
  })(readOffer)
}
