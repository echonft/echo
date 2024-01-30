import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { SignOutParams } from 'next-auth/react'

export function signOut(_options: SignOutParams<true> | undefined): Promise<undefined> {
  return delayPromise(Promise.resolve(undefined), 1200)
}
