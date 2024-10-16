import type { User } from '@echo/model/types/user/user'
import { eqBy, isNil, pick } from 'ramda'

function internalFn(userA: User): (userB: User) => boolean {
  return function (userB: User) {
    return eqBy(pick(['username', 'wallet']), userA, userB)
  }
}

export function eqUser(userA: User, userB: User): boolean
export function eqUser(userA: User): (userB: User) => boolean
export function eqUser(userA: User, userB?: User): boolean | ((userB: User) => boolean) {
  if (isNil(userB)) {
    return internalFn(userA)
  }
  return internalFn(userA)(userB)
}
