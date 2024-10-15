export enum ItemError {
  Chain = 'items are not all on the same chain',
  Duplicates = 'items contain duplicates',
  Empty = 'empty items',
  Erc20Only = 'items do not contain any nft',
  Quantity = 'invalid items quantity'
}
