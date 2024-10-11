export enum ItemError {
  CHAIN = 'items are not all on the same chain',
  DUPLICATES = 'items contain duplicates',
  EMPTY = 'empty items',
  ONLY_ERC20 = 'listing items do not contain any NFT',
  QUANTITY = 'invalid items quantity'
}
