import { convertNftCollection } from '../../converters/nft-collection/convert-nft-collection'
import { FirestoreNftCollectionData } from '../../types/model/data/nft-collection/firestore-nft-collection-data'
import { getNftCollectionSnapshotByContractAddress } from './get-nft-collection-snapshot-by-contract-address'
import { andThen, pipe } from 'ramda'

interface Arguments {
  address: string
  chainId: number
}

export const findNftCollectionByAddress: (args: Arguments) => Promise<FirestoreNftCollectionData> = pipe(
  getNftCollectionSnapshotByContractAddress,
  andThen(convertNftCollection)
)
