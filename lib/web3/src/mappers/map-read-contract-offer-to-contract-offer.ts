import { mapReadContractOfferItemsToContractOfferItems } from '@echo/web3/mappers/map-read-contract-offer-items-to-contract-offer-items'
import type { ContractOffer } from '@echo/web3/types/contract-offer'
import type { ReadContractOffer } from '@echo/web3/types/read-contract-offer'
import { applySpec, head, pipe, prop, toLower } from 'ramda'

export function mapReadContractOfferToContractOffer(readOffer: Readonly<ReadContractOffer>): ContractOffer {
  return applySpec<ContractOffer>({
    sender: pipe(head, toLower),
    receiver: pipe(prop(1), toLower),
    senderItems: pipe(prop(2), mapReadContractOfferItemsToContractOfferItems),
    receiverItems: pipe(prop(3), mapReadContractOfferItemsToContractOfferItems),
    expiration: pipe(prop(4), Number),
    state: prop(5)
  })(readOffer)
}
