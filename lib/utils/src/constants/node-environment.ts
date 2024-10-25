import { isNil } from 'ramda'

export enum NodeEnvironment {
  Development = 'development',
  Production = 'production',
  Test = 'test'
}

export const nodeEnvironment = isNil(process.env.NODE_ENV)
  ? NodeEnvironment.Development
  : (process.env.NODE_ENV as NodeEnvironment)
