import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import { pipe } from 'ramda'

export function getAllNfts(): Promise<NftDocument[]> {
  return pipe(nftsCollection, getQueryData)()
}
