import { unstable_setRequestLocale } from 'next-intl/server'

export function withLocale<Args extends unknown[], Return>(fn: (...args: Args) => Return) {
  return function (...args: Args): Return {
    unstable_setRequestLocale('en')
    return fn.apply(fn, args)
  }
}
