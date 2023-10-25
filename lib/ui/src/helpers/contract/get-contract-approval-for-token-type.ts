import type { TokenType } from '@echo/model/types/token-type'

export function getContractApprovalForTokenType(tokenType: TokenType): string {
  switch (tokenType) {
    case 'ERC721':
      return 'setApprovalForAll'
    default:
      throw new Error('Unsupported Token Type')
  }
}
