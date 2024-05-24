import type { User } from '@echo/model/types/user'
import { equals, isNil, pick } from 'ramda'

function getProps(user: User) {
  return pick(['username', 'wallet'], user)
}

function internalFn(userA: User): (userB: User) => boolean {
  return function (userB: User) {
    return equals(getProps(userA), getProps(userB))
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
