import { getNftCollectionSnapshotByContractAddress } from './get-nft-collection-snapshot-by-contract-address'

export const findNftCollectionByAddress = async (address: string, chainId: number) => {
  const documentSnapshot = await getNftCollectionSnapshotByContractAddress(address, chainId)
  return documentSnapshot?.data()
}
