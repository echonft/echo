import type { Address } from '@echo/model/types/address'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { error, info, warn } from '@echo/tasks/helpers/logger'
import { fetchCollection } from '@echo/tasks/tasks/fetch-collection'
import { fetchNftsByWallet } from '@echo/tasks/tasks/fetch-nfts-by-wallet'
import { andThen, assoc, head, isEmpty, isNil, otherwise, path, pipe, tap } from 'ramda'

export async function fetchNftsForWalletCommand(wallet: Address) {
  const groups = await pipe(
    fetchNftsByWallet,
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
    const contract = pipe<[PartialNft[]], PartialNft, Address>(head, path(['collection', 'contract']))(group)
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
