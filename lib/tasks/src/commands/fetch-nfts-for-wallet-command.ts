import { CollectionError } from '@echo/model/constants/errors/collection-error'
import type { Address } from '@echo/model/types/address'
import type { Collection } from '@echo/model/types/collection'
import { getCollectionByContract } from '@echo/nft-scan/services/get-collection-by-contract'
import { getNftsByWallet } from '@echo/nft-scan/services/get-nfts-by-wallet'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { error, info, warn } from '@echo/tasks/helpers/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { andThen, assoc, collectBy, head, isEmpty, isNil, otherwise, path, pipe } from 'ramda'

export async function fetchNftsForWalletCommand(wallet: Address) {
  const groups = await pipe(
    getNftsByWallet,
    andThen((nfts: PartialNft[]) => {
      if (isEmpty(nfts)) {
        warn({ wallet }, 'this wallet does not own any NFTs')
        return [] as PartialNft[][]
      }
      return collectBy(path(['collection', 'contract']), nfts)
    }),
    otherwise((err) => {
      error({ err, wallet }, 'could not fetch NFTs')
      return [] as PartialNft[][]
    })
  )(wallet)
  for (const group of groups) {
    const contract = pipe<[PartialNft[]], PartialNft, Address>(head, path(['collection', 'contract']))(group)
    const collection = await pipe(
      getCollectionByContract,
      andThen(({ collection, isSpam }) => {
        if (isSpam) {
          warn({ collection }, CollectionError.Spam)
          return undefined as Nullable<Collection>
        }
        return collection
      }),
      otherwise((err) => {
        error({ err, collection: { contract } }, 'could not fetch collection from API')
        return undefined as Nullable<Collection>
      })
    )(contract)
    if (!isNil(collection)) {
      for (const nft of group) {
        info({ wallet, nft: assoc('collection', collection, nft) }, 'fetched NFT')
      }
    }
  }
}
