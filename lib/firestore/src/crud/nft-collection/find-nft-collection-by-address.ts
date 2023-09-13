import { getNftCollectionSnapshotByContractAddress } from '@echo/firestore/crud/nft-collection/get-nft-collection-snapshot-by-contract-address'

export async function findNftCollectionByAddress(address: string, chainId: number) {
  const documentSnapshot = await getNftCollectionSnapshotByContractAddress(address, chainId)
  return documentSnapshot?.data()
}
