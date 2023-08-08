import { getNftCollectionSnapshotByContractAddress } from './get-nft-collection-snapshot-by-contract-address'
import { FirestoreNftCollectionData } from '@echo/firestore'
import { andThen, pipe } from 'ramda'

interface Arguments {
  address: string
  chainId: number
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const findCollectionByAddress: (args: Arguments) => Promise<FirestoreNftCollectionData> = pipe(
  getNftCollectionSnapshotByContractAddress,
  andThen((snapshot) => ({ ...snapshot.data(), id: snapshot.ref.id, refPath: snapshot.ref.path }))
)
