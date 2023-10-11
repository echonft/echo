import { getSignatureDomain } from '@echo/ui/helpers/contract/get-signature-domain'
import { getSignatureTypes } from '@echo/ui/helpers/contract/get-signature-types'
import { mapOfferToOfferSignature } from '@echo/ui/mappers/map-offer-to-offer-signature'
import { Offer } from '@echo/ui/types/model/offer'

export function getSignatureConfigForOffer(offer: Offer, chainId: number) {
  return {
    domain: getSignatureDomain(chainId),
    message: mapOfferToOfferSignature(offer),
    primaryType: 'Trade',
    types: getSignatureTypes()
  }
}
