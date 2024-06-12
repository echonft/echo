import { equals } from 'ramda'

export const isTestnet: boolean = equals('1', process.env.NEXT_PUBLIC_IS_TESTNET)
