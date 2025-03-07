import { userIndex } from '@echo/model/helpers/user/user-index'
import type { UserIndex } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'
import { eqBy, isNil } from 'ramda'

function innerEqUser<T extends UserIndex>(userA: Nullable<T>): (userB: Nullable<T>) => boolean {
  return function (userB: Nullable<T>) {
    if (isNil(userA) && isNil(userB)) {
      return true
    }
    if (isNil(userA) || isNil(userB)) {
      return false
    }
    return eqBy(userIndex, userA, userB)
  }
}

export function eqUser<T extends UserIndex>(userA: Nullable<T>, userB: Nullable<T>): boolean
export function eqUser<T extends UserIndex>(userA: Nullable<T>): (userB: Nullable<T>) => boolean
export function eqUser<T extends UserIndex>(
  userA: Nullable<T>,
  userB?: Nullable<T>
): boolean | ((userB: Nullable<T>) => boolean) {
  if (arguments.length === 1) {
    return innerEqUser(userA)
  }
  return innerEqUser(userA)(userB)
}
