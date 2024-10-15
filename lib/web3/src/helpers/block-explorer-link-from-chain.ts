import type { Wallet } from '@echo/model/types/wallet'

export function blockExplorerLinkFromChain(wallet: Wallet): string {
  switch (wallet.chain) {
    case 'ethereum':
      return `https://etherscan.io/address/${wallet.address}`
    case 'blast':
      return `https://blastscan.io/address/${wallet.address}`
    case 'sepolia':
      return `https://sepolia.etherscan.io/address/${wallet.address}`
    case 'blast_sepolia':
      return `https://sepolia.blastscan.io/address/${wallet.address}`
    case 'sei':
      return `https://seitrace.com/address/${wallet.address}`
  }
}
