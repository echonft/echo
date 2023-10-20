import type { TokenType } from '@echo/model/types/token-type'
import type { Abi } from 'viem'
import { erc721ABI } from 'wagmi'

export function getContractAbiForTokenType(tokenType: TokenType): Abi {
  switch (tokenType) {
    case 'ERC721':
      return erc721ABI
    default:
      throw new Error('Unsupported Token Type')
  }
}
