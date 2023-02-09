import { chaindId } from './chain-id'

export const isProd: boolean = process.env.NODE_ENV === 'production'
export const isDebug = !isProd
export const isMainnet = chaindId() === 1
export * from './chain-id'
