import { TokenType } from '@echo/ui/types/model/token-type'

export function getContractOwnerOfForTokenType(tokenType: TokenType): string {
  switch (tokenType) {
    case 'ERC721':
      return 'ownerOf'
    default:
      throw new Error('Unsupported Token Type')
  }
}
