import { formatWalletAddress } from '@echo/web3/helpers/format-wallet-address'
import { mapReadContractOfferItemsToContractOfferItems } from '@echo/web3/mappers/map-read-contract-offer-items-to-contract-offer-items'
import type { ContractOffer } from '@echo/web3/types/contract-offer'
import type { ReadContractOffer } from '@echo/web3/types/read-contract-offer'
import { applySpec, pipe, prop } from 'ramda'

export function mapReadContractOfferToContractOffer(readOffer: ReadContractOffer): ContractOffer {
  return applySpec({
    sender: pipe(prop(0), formatWalletAddress),
    receiver: pipe(prop(1), formatWalletAddress),
    senderItems: pipe(prop(2), mapReadContractOfferItemsToContractOfferItems),
    receiverItems: pipe(prop(3), mapReadContractOfferItemsToContractOfferItems),
    expiration: pipe(prop(4), Number),
    state: prop(5)
  })(readOffer)
}
