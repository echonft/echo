import { isNil } from 'ramda'

export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  Test = 'test'
}

export function environment() {
  return isNil(process.env.ENV) ? Environment.Development : (process.env.ENV as Environment)
}
