import { getCollectionSnapshotByContractAddress } from '@echo/firestore/crud/collection/get-collection-snapshot-by-contract-address'
import type { HexString } from '@echo/utils/types/hex-string'

export async function findCollectionByAddress(address: Lowercase<HexString>, chainId: number) {
  const documentSnapshot = await getCollectionSnapshotByContractAddress(address, chainId)
  return documentSnapshot?.data()
}
