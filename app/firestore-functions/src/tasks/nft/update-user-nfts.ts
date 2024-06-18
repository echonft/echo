import { updateNftsForWalletTestnet } from '@echo/firestore-functions/tasks/nft/update-user-nfts-testnet'
import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollectionByAddress as getCollectionFromFirestore } from '@echo/firestore/crud/collection/get-collection-by-address'
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
import type { NftIndex } from '@echo/model/types/nft-index'
import type { User } from '@echo/model/types/user'
import type { Wallet } from '@echo/model/types/wallet'
import { getAllNftsByAccount } from '@echo/nft-scan/services/get-all-nfts-by-account'
import { getCollectionByAddress } from '@echo/nft-scan/services/get-collection-by-address'
import type { GetCollectionRequest } from '@echo/nft-scan/types/request/get-collection-request'
import { andThenOtherwise } from '@echo/utils/fp/and-then-otherwise'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import type { Nullable } from '@echo/utils/types/nullable'
import { error, info, warn } from 'firebase-functions/logger'
import { always, andThen, assoc, assocPath, equals, isNil, pick, pipe, prop } from 'ramda'

type GetCollectionArgs = Omit<GetCollectionRequest, 'fetch'>

async function getCollection(args: GetCollectionArgs): Promise<Nullable<Collection>> {
  const collection = await getCollectionFromFirestore(args.contract)
  if (isNil(collection)) {
    return pipe<
      [GetCollectionArgs],
      GetCollectionArgs & Pick<GetCollectionRequest, 'fetch'>,
      ReturnType<typeof getCollectionByAddress>,
      Promise<Collection | undefined>
    >(
      assoc('fetch', fetch),
      getCollectionByAddress,
      andThenOtherwise(
        pipe(
          assoc('verified', false),
          addCollection,
          andThen(
            pipe(
              // TODO
              // tap((newDocument) => {
              //   args.info(`added collection ${newDocument.data.slug}`)
              // }),
              prop('data')
            )
          )
        ),
        always(undefined)
      )
    )(args)
  }
  return collection
}

export async function updateNftsForWallet(wallet: Wallet, owner: User) {
  try {
    const collections = await pipe(assoc('fetch', fetch), getAllNftsByAccount)({ wallet })
    for (const collection of collections) {
      // check if collection exists, if not add it, else set it in the nft
      const firestoreCollection = await getCollection({
        // TODO pass the logger (of interface Logger)
        // logger,
        contract: collection.contract
      })
      for (const nft of collection.nfts) {
        try {
          if (!isNil(firestoreCollection)) {
            const nftWithCollectionSlug = assocPath(
              ['collection', 'slug'],
              firestoreCollection.slug,
              nft
            ) as DeepPartial<Nft> & Required<NftIndex>
            const existingNft: Nullable<Nft> = await pipe(getNftIndex, getNft)(nftWithCollectionSlug)
            if (isNil(existingNft)) {
              info(
                `nft #${nft.tokenId} for collection with contract ${JSON.stringify(
                  nft.collection.contract,
                  undefined,
                  2
                )} is not in the database, adding...`
              )
              try {
                await pipe<
                  [
                    Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & Record<'collection', Pick<Collection, 'contract'>>
                  ],
                  Omit<Nft, 'owner' | 'updatedAt'>,
                  Omit<Nft, 'updatedAt'>,
                  Promise<NewDocument<Nft>>
                >(
                  assoc('collection', firestoreCollection),
                  assoc('owner', owner),
                  addNft
                )(nft)
              } catch (e) {
                error(
                  `error adding nft #${nft.tokenId} for collection with contract ${JSON.stringify(
                    nft.collection.contract,
                    undefined,
                    2
                  )}: ${errorMessage(e)}`
                )
              }
              info(`added nft ${firestoreCollection.slug} #${nft.tokenId}`)
            } else if (!equals(existingNft.owner.wallet, owner.wallet)) {
              warn(
                `nft ${existingNft.collection.slug} #${existingNft.tokenId} is not owned by ${existingNft.owner.wallet.address} anymore, updating owner...`
              )
              try {
                await pipe(assoc('owner', owner), updateNft)(existingNft)
                info(
                  `updated owner of nft ${existingNft.collection.slug} #${existingNft.tokenId} to ${owner.wallet.address}`
                )
              } catch (e) {
                error(
                  `error setting new owner of nft ${existingNft.collection.slug} #${nft.tokenId}: ${errorMessage(e)}`
                )
              }
            }
          }
        } catch (e) {
          error(
            `error getting NFT #${nft.tokenId}} for collection with contract ${JSON.stringify(
              nft.collection.contract,
              undefined,
              2
            )}: ${errorMessage(e)}`
          )
        }
      }
    }
  } catch (e) {
    error(`error fetching NFTs for wallet ${JSON.stringify(wallet)}: ${errorMessage(e)}`)
  }
}

export async function updateUserNfts(user: UserDocumentData, wallets: WalletDocumentData[]) {
  for (const wallet of wallets) {
    info(`updating NFTs for wallet ${JSON.stringify(wallet)}`)
    const owner: User = getUserFromFirestoreData(user, wallet)
    if (isTestnetChain(wallet.chain)) {
      await updateNftsForWalletTestnet(pick(['address', 'chain'], wallet), owner)
    } else {
      await updateNftsForWallet(pick(['address', 'chain'], wallet), owner)
    }
    info(`done updating NFTs for wallet ${JSON.stringify(wallet)}`)
  }
}
