import { getNftsForCollection } from '@echo/helius/services/get-nfts-for-collection'
import type { SupportedCluster } from '@echo/helius/types/supported-cluster'
import { type Umi } from '@metaplex-foundation/umi'
import { andThen, path, pipe } from 'ramda'

export async function getCollectionNfts(umi: Umi, collectionAddress: string) {
  const response = await pipe(
    getNftsForCollection,
    andThen(path(['result', 'items']))
  )({
    cluster: umi.rpc.getCluster() as SupportedCluster,
    collectionAddress
  })
  // const toString = bind(JSON.stringify, JSON)
  console.log(`nfts: ${JSON.stringify(response)}`)
  // console.log(`collection 1st: ${pipe(head, toString)(nfts)}`)
  // console.log(`collection last: ${pipe(last, toString)(nfts)}`)
}
