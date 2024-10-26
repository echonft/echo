import type { Contract } from '@echo/model/types/contract'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { error, info, warn } from '@echo/tasks/helpers/logger'
import { fetchCollection } from '@echo/tasks/tasks/fetch-collection'
import { fetchNftsByAccount } from '@echo/tasks/tasks/fetch-nfts-by-account'
import { andThen, assoc, head, isEmpty, isNil, otherwise, path, pipe, tap } from 'ramda'

export async function fetchNftsForWalletCommand(wallet: Contract) {
  const groups = await pipe(
    fetchNftsByAccount,
    andThen(
      tap((groups) => {
        if (isEmpty(groups)) {
          warn({ wallet }, 'this wallet does not own any NFTs')
        }
      })
    ),
    otherwise((err) => {
      error({ err, wallet }, 'could not fetch NFTs')
      return []
    })
  )(wallet)
  for (const group of groups) {
    const contract = pipe<[PartialNft[]], PartialNft, Contract>(head, path(['collection', 'contract']))(group)
    const collection = await pipe(
      fetchCollection,
      andThen(
        tap((collection) => {
          if (isNil(collection)) {
            warn({ collection: { contract } }, 'collection not found')
          }
        })
      ),
      otherwise((err) => {
        error({ err, collection: { contract } }, 'could not fetch collection')
        return undefined
      })
    )(contract)
    if (!isNil(collection)) {
      for (const nft of group) {
        info({ wallet, nft: assoc('collection', collection, nft) }, 'fetched NFT')
      }
    }
  }
}
