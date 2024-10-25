import { getNftSnapshotByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import type { NftIndex } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getNftSnapshot(nft: NftIndex): Promise<Nullable<QueryDocumentSnapshot<NftDocument>>> {
  return pipe(nftIndex, getNftSnapshotByIndex)(nft)
}
