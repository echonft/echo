import type { TokenType } from '@echo/model/types/token-type'

export function getContractIsApprovedForTokenType(tokenType: TokenType): string {
  switch (tokenType) {
    case 'ERC721':
      return 'isApprovedForAll'
    default:
      throw new Error('Unsupported Token Type')
  }
}
