import { chainId } from './chain-id'

export const isProd: boolean = process.env.NODE_ENV === 'production'
export const isDebug = !isProd
export const isMainnet = chainId() === 1
export * from './chain-id'
