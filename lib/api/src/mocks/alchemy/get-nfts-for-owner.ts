export const mockGetNftsForOwner = (args: {
  owner: string
  contractAddresses: string[] // max 45
}) => {
  if (args.owner === 'reject' || args.owner === 'error') {
    return Promise.reject('mockGetNftsForOwner error')
  }
  // if (args.owner === 'error') {
  //   return Promise.resolve(R.fromNullable(undefined, 'mockGetNftsForOwner error'))
  // }
  return Promise.resolve([{ contractAddress: 'test', tokenId: 1 }])
}
