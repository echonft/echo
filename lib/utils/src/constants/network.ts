export enum Network {
  Mainnet = 'mainnet',
  Testnet = 'testnet'
}

export const network = process.env.NEXT_PUBLIC_IS_TESTNET === '1' ? Network.Testnet : Network.Mainnet
