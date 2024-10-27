import { listElementsEqWith } from '@echo/utils/helpers/list-elements-eq-with'
import { equals } from 'ramda'

export function listElementsEq<T>(list: T[]): boolean {
  return listElementsEqWith(equals, list)
}
