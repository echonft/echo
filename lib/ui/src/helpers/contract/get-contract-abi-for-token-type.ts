import { TokenType } from '@echo/ui/types/model/token-type'
import { Abi } from 'viem'
import { erc721ABI } from 'wagmi'

export function getContractAbiForTokenType(tokenType: TokenType): Abi {
  switch (tokenType) {
    case 'ERC721':
      return erc721ABI
    default:
      throw new Error('Unsupported Token Type')
  }
}
