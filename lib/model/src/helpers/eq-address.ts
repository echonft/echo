import type { Address } from '@echo/model/types/address'
import type { Nullable } from '@echo/utils/types/nullable'
import { eqBy, isNil, toLower } from 'ramda'

function innerEqAddress(addressA: Nullable<Address>): (addressB: Nullable<Address>) => boolean {
  return function (addressB: Nullable<Address>) {
    if (isNil(addressA)) {
      return !!isNil(addressB)
    }
    if (isNil(addressB)) {
      return false
    }
    return eqBy(toLower, addressA, addressB)
  }
}

export function eqAddress(addressA: Nullable<Address>, addressB: Nullable<Address>): boolean
export function eqAddress(addressA: Nullable<Address>): (addressB: Nullable<Address>) => boolean
export function eqAddress(
  addressA: Nullable<Address>,
  addressB?: Nullable<Address>
): boolean | ((addressB: Nullable<Address>) => boolean) {
  if (isNil(addressB)) {
    return innerEqAddress(addressA)
  }
  return innerEqAddress(addressA)(addressB)
}
