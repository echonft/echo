import { type TraitFilter } from '@echo/ui/types/trait-filter'
import { allPass, isNil, propEq } from 'ramda'

function internalFn(valueA: TraitFilter) {
  return function (valueB: TraitFilter) {
    return allPass([propEq(valueA.trait, 'trait'), propEq(valueA.value, 'value')])(valueB)
  }
}

export function traitFilterEquals(valueA: TraitFilter): (valueB: TraitFilter) => boolean
export function traitFilterEquals(valueA: TraitFilter, valueB: TraitFilter): boolean
export function traitFilterEquals(
  valueA: TraitFilter,
  valueB?: TraitFilter
): ((valueB: TraitFilter) => boolean) | boolean {
  if (isNil(valueB)) {
    return internalFn(valueA)
  }
  return internalFn(valueA)(valueB)
}
