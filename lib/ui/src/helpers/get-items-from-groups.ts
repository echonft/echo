import { Group } from '../types/group'
import { NonEmptyArray } from '@echo/utils'
import { flatten, map, pipe, prop } from 'ramda'

export function getItemsFromGroups<T>(groups: NonEmptyArray<Group<T>>): Array<T> {
  return pipe(map(prop('items')), flatten)(groups) as Array<T>
}
