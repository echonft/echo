import type { Wallet } from '@echo/model/types/wallet'
import { equals, isNil, toLower } from 'ramda'

function internalFn<T extends Wallet, U extends Wallet>(walletA: T): (walletB: U) => boolean {
  return function (walletB: U) {
    return equals(walletA.chain, walletB.chain) && equals(toLower(walletA.address), toLower(walletB.address))
  }
}

export function eqWallet<T extends Wallet, U extends Wallet>(walletA: T, walletB: U): boolean
export function eqWallet<T extends Wallet, U extends Wallet>(walletA: T): (walletB: U) => boolean
export function eqWallet<T extends Wallet, U extends Wallet>(
  walletA: T,
  walletB?: U
): boolean | ((walletB: U) => boolean) {
  if (isNil(walletB)) {
    return internalFn(walletA)
  }
  return internalFn(walletA)(walletB)
}
