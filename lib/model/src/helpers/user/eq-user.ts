import { userIndex } from '@echo/model/helpers/user/user-index'
import type { UserIndex } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'
import { eqBy, isNil } from 'ramda'

function innerEqUser<T extends UserIndex>(userA: Nullable<T>): (userB: Nullable<T>) => boolean {
  return function (userB: Nullable<T>) {
    if (isNil(userA)) {
      return !!isNil(userB)
    }
    if (isNil(userB)) {
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
  if (isNil(userB)) {
    return innerEqUser(userA)
  }
  return innerEqUser(userA)(userB)
}
