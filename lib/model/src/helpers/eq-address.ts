import type { Address } from '@echo/model/types/address'
import { eqBy, isNil, toLower } from 'ramda'

function innerEqAddress(addressA: Address): (addressB: Address) => boolean {
  return function (addressB: Address) {
    return eqBy(toLower, addressA, addressB)
  }
}

export function eqAddress(addressA: Address, addressB: Address): boolean
export function eqAddress(addressA: Address): (addressB: Address) => boolean
export function eqAddress(addressA: Address, addressB?: Address): boolean | ((addressB: Address) => boolean) {
  if (isNil(addressB)) {
    return innerEqAddress(addressA)
  }
  return innerEqAddress(addressA)(addressB)
}
