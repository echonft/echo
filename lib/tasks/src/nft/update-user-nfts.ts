import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollection as getCollectionFromFirestore } from '@echo/firestore/crud/collection/get-collection'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import type { Wallet } from '@echo/model/types/wallet'
import { getCollection as getCollectionFromOpensea } from '@echo/opensea/services/get-collection'
import { getNftsByAccount, type GetNftsByAccountArgs } from '@echo/opensea/services/get-nfts-by-account'
import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { isTestnetChain } from '@echo/utils/helpers/is-testnet-chain'
import type { LoggerInterface } from '@echo/utils/types/logger-interface'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, andThen, assoc, equals, isNil, otherwise, pick, pipe, prop, tap } from 'ramda'

async function getCollection(
  args: Omit<GetCollectionRequest, 'fetch'> & {
    logger?: LoggerInterface
  }
): Promise<Nullable<Collection>> {
  const collection = await getCollectionFromFirestore(args.slug)
  if (isNil(collection)) {
    return pipe(
      assoc('fetch', fetch),
      getCollectionFromOpensea,
      otherwise(always(undefined)),
      andThen(
        pipe(
          assoc('verified', false),
          addCollection,
          andThen(
            pipe(
              tap((newDocument) => {
                args.logger?.info(`added collection ${newDocument.data.slug}`)
              }),
              prop('data')
            )
          )
        )
      )
    )(args)
  }
  return collection
}

export async function updateNftsForWallet(wallet: Wallet, owner: User, logger?: LoggerInterface) {
  try {
    const nfts = await pipe<[Wallet], GetNftsByAccountArgs, ReturnType<typeof getNftsByAccount>>(
      assoc('fetch', fetch),
      getNftsByAccount
    )(wallet)
    for (const nft of nfts) {
      try {
        // check if collection exists, if not add it, else set it in the nft
        const collection = await getCollection({
          logger,
          slug: nft.collection.slug,
          testnet: isTestnetChain(wallet.chain)
        })
        if (!isNil(collection)) {
          const existingNft: Nullable<Nft> = await pipe(getNftIndex, getNft)(nft)
          if (isNil(existingNft)) {
            logger?.info(`nft ${nft.collection.slug} #${nft.tokenId} is not in the database, adding...`)
            try {
              await pipe<
                [
                  Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & {
                    collection: Pick<Collection, 'slug'>
                  }
                ],
                Omit<Nft, 'owner' | 'updatedAt'>,
                Omit<Nft, 'updatedAt'>,
                Promise<NewDocument<Nft>>
              >(
                assoc('collection', collection),
                assoc('owner', owner),
                addNft
              )(nft)
            } catch (e) {
              logger?.error(`error adding nft ${nft.collection.slug} #${nft.tokenId}: ${errorMessage(e)}`)
            }
            logger?.info(`added nft ${nft.collection.slug} #${nft.tokenId}`)
          } else if (!equals(existingNft.owner.wallet, owner.wallet)) {
            logger?.warn(
              `nft ${existingNft.collection.slug} #${existingNft.tokenId} is not owned by ${existingNft.owner.wallet.address} anymore, updating owner...`
            )
            try {
              await pipe(assoc('owner', owner), updateNft)(existingNft)
              logger?.info(
                `updated owner of nft ${existingNft.collection.slug} #${existingNft.tokenId} to ${owner.wallet.address}`
              )
            } catch (e) {
              logger?.error(`error setting new owner of nft ${nft.collection.slug} #${nft.tokenId}: ${errorMessage(e)}`)
            }
          }
        }
      } catch (e) {
        logger?.error(`error getting NFT ${nft.collection.slug} #${nft.tokenId}}: ${errorMessage(e)}`)
      }
    }
  } catch (e) {
    logger?.error(`error fetching NFTs for wallet ${JSON.stringify(wallet)}: ${errorMessage(e)}`)
  }
}

export async function updateUserNfts(user: UserDocumentData, wallets: WalletDocumentData[], logger?: LoggerInterface) {
  for (const wallet of wallets) {
    const owner: User = getUserFromFirestoreData(user, wallet)
    await updateNftsForWallet(pick(['address', 'chain'], wallet), owner, logger)
    logger?.info(`done updating NFTs for wallet ${JSON.stringify(wallet)}`)
  }
}
