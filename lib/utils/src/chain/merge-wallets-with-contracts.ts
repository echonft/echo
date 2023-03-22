import { castAs } from '../fp'
import { Contract, Wallet } from '@echo/model'
import { allPass, complement, groupBy, isEmpty, mapObjIndexed, pickBy, pipe, prop, toString } from 'ramda'

export function mergeWalletsAndContractsByChainId(wallets: Wallet[], contracts: Contract[]) {
  return pipe(
    groupBy(pipe(prop('chainId'), toString)),
    mapObjIndexed((contracts, chainId) => ({
      contracts: contracts,
      wallets: wallets.filter((wallet) => wallet.chainId === Number(chainId))
    })),
    pickBy(allPass([pipe(prop('contracts'), complement(isEmpty)), pipe(prop('wallets'), complement(isEmpty))])),
    castAs<{
      [key: string]: {
        contracts: Contract[]
        wallets: Wallet[]
      }
    }>
  )(contracts)
}
