export enum ItemError {
  Chain = 'items are not all on the same chain',
  Duplicates = 'items contain duplicates',
  Erc20Only = 'items do not contain any nft',
  Type = 'wrong item type',
  Quantity = 'invalid item quantity'
}
