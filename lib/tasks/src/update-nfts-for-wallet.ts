import { getNft } from '@echo/firestore/crud/nft/get-nft'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { eqWallet } from '@echo/model/helpers/wallet/eq-wallet'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { getNftsByAccount as getNftsFromNftScan } from '@echo/nft-scan/services/get-nfts-by-account'
import { getNftsByAccount as getNftsFromOpensea } from '@echo/opensea/services/get-nfts-by-account'
import { addCollection } from '@echo/tasks/add-collection'
import { addNft } from '@echo/tasks/add-nft'
import { assessNftOwnershipForWallet } from '@echo/tasks/assess-nft-ownership-for-wallet'
import { changeNftOwnership } from '@echo/tasks/change-nft-ownership'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { always, andThen, applySpec, assoc, collectBy, head, isNil, map, otherwise, path, pipe, prop } from 'ramda'

type PartialNft = Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & {
  collection: Pick<Collection, 'contract'>
}

interface UpdateNftsForWalletArgs extends WithFetch {
  wallet: WalletDocumentData
}

function getNftGroups(args: WithLoggerType<UpdateNftsForWalletArgs>) {
  const { wallet, logger } = args
  try {
    const fetcher = isTestnetChain(wallet.chain) ? getNftsFromOpensea : getNftsFromNftScan
    return pipe(
      fetcher,
      andThen(collectBy(nonNullableReturn<[PartialNft], string>(path(['collection', 'contract', 'address'])))),
      otherwise(always(undefined))
    )(args)
  } catch (err) {
    logger?.error({ err, wallet }, 'error fetching NFTs')
    return undefined
  }
}

function getCollection(args: WithLoggerType<Record<'nfts', PartialNft[]>>) {
  try {
    return pipe<
      [WithLoggerType<Record<'nfts', PartialNft[]>>],
      WithLoggerType<Record<'contract', Wallet>>,
      Promise<Nullable<Omit<Collection, 'swapsCount'>>>,
      Promise<Nullable<Omit<Collection, 'swapsCount'>>>
    >(
      applySpec<WithLoggerType<Record<'contract', Wallet>>>({
        contract: pipe(prop('nfts'), head, path(['collection', 'contract'])),
        logger: prop('logger')
      }),
      addCollection,
      otherwise(always(undefined))
    )(args)
  } catch (err) {
    args.logger?.error({ err }, 'error fetching collection')
    return undefined
  }
}

/**
 * To update NFTs for a wallet, we query an NFT API to fetch the NFTs owned by the wallet, compare the results
 * against our database, and update it accordingly.
 * There are 3 scenarios possible here:
 * 1. The wallet acquired a new NFT that is not in our database
 *    => we add it to the database
 * 2. The wallet acquired an NFT that belonged to another wallet in our database (or vice versa)
 *    => we update the owner of the NFT
 * 3. The wallet transferred an NFT to a wallet that is not on our platform
 *    => we delete the NFT from the database
 * @param args
 */
export async function updateNftsForWallet(args: WithLoggerType<UpdateNftsForWalletArgs>) {
  const { wallet, logger } = args
  logger?.info({ wallet }, 'started updating NFTs for wallet')
  const nftGroups = await getNftGroups(args)
  if (!isNil(nftGroups)) {
    for (const nftGroup of nftGroups) {
      const collection = await getCollection({ nfts: nftGroup, logger })
      if (!isNil(collection)) {
        const nftGroupWithCollection = map(assoc('collection', collection), nftGroup)
        for (const nft of nftGroupWithCollection) {
          try {
            logger?.info({ nft, wallet }, 'wallet owns NFT')
            const existingNft: Nullable<Nft> = await pipe(getNftIndex, getNft)(nft)
            if (isNil(existingNft)) {
              logger?.warn({ nft, wallet }, 'NFT is not in the database')
              await addNft({ nft, wallet, logger })
            } else if (!eqWallet(existingNft.owner.wallet, wallet)) {
              logger?.warn({ nft, wallet }, 'NFT ownership changed')
              await changeNftOwnership({ nft: existingNft, wallet, logger })
            } else {
              logger?.info({ nft, wallet }, 'NFT is in the database with the right owner')
            }
          } catch (err) {
            logger?.error({ err, nft }, 'error getting NFT from database')
          }
        }
      }
    }
  }
  await assessNftOwnershipForWallet({ wallet, logger })
  logger?.info({ wallet }, 'done updating NFTs for wallet')
}
