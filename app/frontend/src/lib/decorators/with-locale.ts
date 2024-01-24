import type { NextReturn } from '@echo/frontend/lib/types/next-return'
import { unstable_setRequestLocale } from 'next-intl/server'

export function withLocale<Args, Return extends NextReturn>(fn: (args: Args) => Return) {
  return function (args: Args): Return {
    unstable_setRequestLocale('en')
    return fn.call(fn, args)
  }
}
