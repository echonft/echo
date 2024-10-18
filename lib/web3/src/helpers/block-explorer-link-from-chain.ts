import type { Wallet } from '@echo/model/types/wallet'
import { Chain } from '@echo/utils/constants/chain'
import { ChainError } from '@echo/web3/constants/errors/chain-error'

export function blockExplorerLinkFromChain(wallet: Wallet): string {
  switch (wallet.chain) {
    case Chain.Ethereum:
      return `https://etherscan.io/address/${wallet.address}`
    case Chain.Blast:
      return `https://blastscan.io/address/${wallet.address}`
    case Chain.Sepolia:
      return `https://sepolia.etherscan.io/address/${wallet.address}`
    case Chain.BlastSepolia:
      return `https://sepolia.blastscan.io/address/${wallet.address}`
    case Chain.Sei:
      return `https://seitrace.com/address/${wallet.address}`
    default:
      throw Error(ChainError.NotSupported)
  }
}
