import { getNftSnapshotByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import type { NftDocumentData } from '@echo/firestore/types/model/nft-document-data'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import type { Nft, NftIndex } from '@echo/model/types/nft/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getNftSnapshot(nft: NftIndex): Promise<Nullable<QueryDocumentSnapshot<Nft, NftDocumentData>>> {
  return pipe(nftIndex, getNftSnapshotByIndex)(nft)
}
