import { isNil } from 'ramda'

export enum Environment {
  Development = 'development',
  Production = 'production'
}

export function environment() {
  return isNil(process.env.ENV) ? Environment.Development : (process.env.ENV as Environment)
}
