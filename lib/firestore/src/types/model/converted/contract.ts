export interface Contract {
  id: string
  address: string
  chainId: number
  name: string | undefined
  symbol: string | undefined
  tokenType: 'ERC721' | 'ERC1155' | 'ERC20' | 'NATIVE'
}
