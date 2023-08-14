interface Wallet {
  chainId: number
  address: string
}

export interface WalletResponse {
  wallets: Wallet[]
}
