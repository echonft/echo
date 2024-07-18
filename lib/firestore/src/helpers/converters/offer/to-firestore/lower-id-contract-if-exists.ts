import { lowerIdContract } from '@echo/firestore/helpers/converters/offer/lower-id-contract'
import type { Offer } from '@echo/model/types/offer'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

export function lowerIdContractIfExists(offer: WithFieldValue<Offer>): WithFieldValue<Offer> {
  return whenHas('idContract', lowerIdContract, offer)
}
