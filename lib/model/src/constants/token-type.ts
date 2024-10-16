export enum TokenType {
  Erc20 = 'erc20',
  Erc721 = 'erc721',
  Erc1155 = 'erc1155'
}

export type NftTokenType = TokenType.Erc721 | TokenType.Erc1155
