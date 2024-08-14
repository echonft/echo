import type { Wallet } from '@echo/model/types/wallet'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { fetchCollection } from '@echo/tasks/fetch-collection'
import { fetchNftsByAccount } from '@echo/tasks/fetch-nfts-by-account'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { andThen, assoc, head, isEmpty, isNil, otherwise, path, pipe, tap } from 'ramda'

export async function fetchNftsForWalletCommand(wallet: Wallet) {
  const logger = getLogger(fetchNftsForWalletCommand.name)
  const groups = await pipe(
    fetchNftsByAccount,
    andThen(
      tap((groups) => {
        if (isEmpty(groups)) {
          logger.warn({ wallet }, 'this wallet does not own any NFTs')
        }
      })
    ),
    otherwise((err) => {
      logger.error({ err, wallet }, 'could not fetch NFTs')
      return []
    })
  )({ wallet, fetch, logger })
  for (const group of groups) {
    const contract = pipe<[PartialNft[]], PartialNft, Wallet>(
      head,
      nonNullableReturn(path(['collection', 'contract']))
    )(group)
    const collection = await pipe(
      fetchCollection,
      andThen(
        tap((collection) => {
          if (isNil(collection)) {
            logger.warn({ collection: { contract } }, 'collection not found')
          }
        })
      ),
      otherwise((err) => {
        logger.error({ err, collection: { contract } }, 'could not fetch collection')
        return undefined
      })
    )({ contract, fetch, logger })
    if (!isNil(collection)) {
      for (const nft of group) {
        logger.info({ wallet, nft: assoc('collection', collection, nft) }, 'fetched NFT')
      }
    }
  }
}
