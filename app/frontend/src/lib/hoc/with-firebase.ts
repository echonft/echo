import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'

export function withFirebase<Args extends unknown[], Return>(fn: (...args: Args) => Return) {
  initializeFirebase()
  return fn
}
