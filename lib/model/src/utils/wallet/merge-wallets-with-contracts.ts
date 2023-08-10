import { Contract } from '../../types/contract'
import { Wallet } from '../../types/wallet'
import { allPass, complement, groupBy, isEmpty, mapObjIndexed, pickBy, pipe, prop, toString } from 'ramda'

/**
 * Takes an array of wallets and contracts and merge them into a new structure.
 * The structure created is an object with the key being the chain ID and then an array of wallets and contracts linked
 * to it.
 * If there is no wallet or contract for a chain ID, it is not added. Each chain ID must have wallets AND contracts
 * @param wallets The array of wallets
 * @param contracts The array of contracts
 */
export function mergeWalletsAndContractsByChainId(wallets: Wallet[], contracts: Contract[]) {
  return pipe(
    groupBy(pipe(prop('chainId'), toString)),
    mapObjIndexed((contracts, chainId) => ({
      contracts: contracts,
      wallets: wallets.filter((wallet) => wallet.chainId === Number(chainId))
    })),
    pickBy(allPass([pipe(prop('contracts'), complement(isEmpty)), pipe(prop('wallets'), complement(isEmpty))]))
  )(contracts) as {
    [key: string]: {
      contracts: Contract[]
      wallets: Wallet[]
    }
  }
}
