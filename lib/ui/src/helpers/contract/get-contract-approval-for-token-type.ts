import { TokenType } from '@echo/ui/types/model/token-type'

export function getContractApprovalForTokenType(tokenType: TokenType): string {
  switch (tokenType) {
    case 'ERC721':
      return 'setApprovalForAll'
    default:
      throw new Error('Unsupported Token Type')
  }
}
