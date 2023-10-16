import { getCollectionSnapshotByContractAddress } from '@echo/firestore/crud/collection/get-collection-snapshot-by-contract-address'

export async function findCollectionByAddress(address: string, chainId: number) {
  const documentSnapshot = await getCollectionSnapshotByContractAddress(address, chainId)
  return documentSnapshot?.data()
}
