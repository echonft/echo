import { Chain } from '@echo/utils/constants/chain'
import { ChainError } from '@echo/web3/constants/errors/chain-error'

export function getChain(id: number): Chain {
  switch (id) {
    case 81457:
      return Chain.Blast
    case 168587773:
      return Chain.BlastSepolia
    case 1:
      return Chain.Ethereum
    case 11155111:
      return Chain.Sepolia
    case 1329:
      return Chain.Sei
    default:
      throw Error(ChainError.NotSupported)
  }
}
