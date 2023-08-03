import { R } from '@mobily/ts-belt'

export const mockGetNftsForOwner = (args: {
  owner: string
  contractAddresses: string[] // max 45
}) => {
  if (args.owner === 'reject') {
    return Promise.reject('mockGetNftsForOwner error')
  }
  if (args.owner === 'error') {
    return Promise.resolve(R.fromNullable(undefined, 'mockGetNftsForOwner error'))
  }
  return Promise.resolve(R.fromNullable([{ contractAddress: 'test', tokenId: 1 }], 'test'))
}
