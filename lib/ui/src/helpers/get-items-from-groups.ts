import type { Group } from '@echo/ui/types/group'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { flatten, map, pipe, prop } from 'ramda'

export function getItemsFromGroups<T>(groups: NonEmptyArray<Group<T>>): T[] {
  return pipe(map(prop('items')), flatten)(groups) as T[]
}
