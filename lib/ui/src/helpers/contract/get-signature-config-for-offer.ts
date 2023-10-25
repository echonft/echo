import type { Offer } from '@echo/model/types/offer'
import { getSignatureDomain } from '@echo/ui/helpers/contract/get-signature-domain'
import { getSignatureTypes } from '@echo/ui/helpers/contract/get-signature-types'
import { mapOfferToOfferSignature } from '@echo/ui/mappers/map-offer-to-offer-signature'

export function getSignatureConfigForOffer(offer: Offer, chainId: number) {
  return {
    domain: getSignatureDomain(chainId),
    types: getSignatureTypes(),
    primaryType: 'Trade' as const,
    message: mapOfferToOfferSignature(offer)
  }
}
