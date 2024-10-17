import { userIndex } from '@echo/model/helpers/user/user-index'
import type { UserIndex } from '@echo/model/types/user/user'
import { eqBy, isNil } from 'ramda'

function internalFn(userA: UserIndex): (userB: UserIndex) => boolean {
  return function (userB: UserIndex) {
    return eqBy(userIndex, userA, userB)
  }
}

export function eqUser(userA: UserIndex, userB: UserIndex): boolean
export function eqUser(userA: UserIndex): (userB: UserIndex) => boolean
export function eqUser(userA: UserIndex, userB?: UserIndex): boolean | ((userB: UserIndex) => boolean) {
  if (isNil(userB)) {
    return internalFn(userA)
  }
  return internalFn(userA)(userB)
}
