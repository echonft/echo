export enum Network {
  Mainnet = 'mainnet',
  Testnet = 'testnet'
}

export function network() {
  return process.env.NEXT_PUBLIC_IS_TESTNET === '1' ? Network.Testnet : Network.Mainnet
}
