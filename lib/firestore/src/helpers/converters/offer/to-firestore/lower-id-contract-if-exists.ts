import type { Offer } from '@echo/model/types/offer'
import { has, modify, toLower } from 'ramda'

export function lowerIdContractIfExists(modelObject: Partial<Offer>): Partial<Offer> {
  if (has('idContract', modelObject)) {
    return modify('idContract', toLower, modelObject) as Partial<Offer>
  }
  return modelObject
}
