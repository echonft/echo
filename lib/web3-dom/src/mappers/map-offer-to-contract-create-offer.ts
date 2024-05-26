import type { Offer } from '@echo/model/types/offer'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { mapOfferItemToContractOfferItem } from '@echo/web3-dom/mappers/map-offer-item-to-contract-offer-item'
import type { ContractCreateOffer } from '@echo/web3-dom/types/contract-create-offer'
import { ContractOfferState } from '@echo/web3-dom/types/contract-offer-state'
import { always, applySpec, map, pipe, prop } from 'ramda'

export function mapOfferToContractCreateOffer(args: Offer): ContractCreateOffer {
  return applySpec<ContractCreateOffer>({
    sender: pipe(prop('sender'), formatAddress),
    receiver: pipe(prop('receiver'), formatAddress),
    senderItems: pipe(prop('senderItems'), map(mapOfferItemToContractOfferItem)),
    receiverItems: pipe(prop('receiverItems'), map(mapOfferItemToContractOfferItem)),
    expiration: prop('expiresAt'),
    state: always(ContractOfferState.OPEN)
  })(args)
}
