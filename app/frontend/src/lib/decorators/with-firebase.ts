import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { NextReturn } from '@echo/frontend/lib/types/next-return'

export function withFirebase<Args, Return extends NextReturn>(fn: (args: Args) => Return) {
  return function (args: Args): Return {
    initializeFirebase()
    return fn.call(fn, args)
  }
}
