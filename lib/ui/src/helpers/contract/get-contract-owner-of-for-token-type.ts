import type { TokenType } from '@echo/model/types/token-type'

export function getContractOwnerOfForTokenType(tokenType: TokenType): string {
  switch (tokenType) {
    case 'ERC721':
      return 'ownerOf'
    default:
      throw new Error('Unsupported Token Type')
  }
}
