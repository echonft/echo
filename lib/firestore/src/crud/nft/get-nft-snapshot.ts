import { getNftSnapshotByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft, PartialNft } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getNftSnapshot(nft: PartialNft): Promise<Nullable<QueryDocumentSnapshot<Nft>>> {
  return pipe(getNftIndex, getNftSnapshotByIndex)(nft)
}
