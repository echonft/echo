import type { Address } from '@echo/model/types/address'
import type { Nullable } from '@echo/utils/types/nullable'
import { eqBy, isNil, toLower } from 'ramda'

function innerEqAddress(addressA: Nullable<Address>): (addressB: Nullable<Address>) => boolean {
  return function (addressB: Nullable<Address>) {
    if (isNil(addressA) && isNil(addressB)) {
      return true
    }
    if (isNil(addressA) || isNil(addressB)) {
      return false
    }
    // Compare non-nil addresses case-insensitively
    return eqBy(toLower, addressA, addressB)
  }
}

export function eqAddress(addressA: Nullable<Address>, addressB: Nullable<Address>): boolean
export function eqAddress(addressA: Nullable<Address>): (addressB: Nullable<Address>) => boolean
export function eqAddress(
  addressA: Nullable<Address>,
  addressB?: Nullable<Address>
): boolean | ((addressB: Nullable<Address>) => boolean) {
  if (arguments.length === 1) {
    return innerEqAddress(addressA)
  }
  return innerEqAddress(addressA)(addressB)
}
