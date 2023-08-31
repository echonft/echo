import { equals } from 'ramda'

// we have to use ramda, or else frontend won't build...
// Type error: This comparison appears to be unintentional because the types '"mock"' and '"development" | "production" | "test"' have no overlap.
export function isMockEnvironment() {
  return equals('mock', process.env.NODE_ENV)
}
