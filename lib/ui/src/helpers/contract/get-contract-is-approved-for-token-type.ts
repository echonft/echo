import { TokenType } from '@echo/ui/types/model/token-type'

export function getContractIsApprovedForTokenType(tokenType: TokenType): string {
  switch (tokenType) {
    case 'ERC721':
      return 'isApprovedForAll'
    default:
      throw new Error('Unsupported Token Type')
  }
}
