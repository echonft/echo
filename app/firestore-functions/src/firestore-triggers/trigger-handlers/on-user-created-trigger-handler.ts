import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollectionByContract } from '@echo/firestore/crud/collection/get-collection-by-contract'
import { getNftByCollectionContract } from '@echo/firestore/crud/nft/get-nft-by-collection-contract'
import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { eqUser } from '@echo/model/helpers/user/eq-user'
import type { Collection } from '@echo/model/types/collection'
import type { User } from '@echo/model/types/user'
import { getCollectionsByWallet } from '@echo/nft-scan/services/get-collections-by-wallet'
import { getNftsByWallet } from '@echo/nft-scan/services/get-nfts-by-wallet'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { FetchCollectionResponse } from '@echo/nft-scan/types/response/fetch-collection-response'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { error, info } from 'firebase-functions/logger'
import { always, andThen, assoc, isNil, map, otherwise, pipe, prop, reject } from 'ramda'

export async function onUserCreatedTriggerHandler(document: Nullable<UserDocument>) {
  if (!isNil(document)) {
    info({ user: document }, 'user was created')
    const { wallet } = document
    const collections = await pipe(
      getCollectionsByWallet,
      andThen(
        pipe<[FetchCollectionResponse[]], FetchCollectionResponse[], Nullable<Collection>[], Collection[]>(
          reject<FetchCollectionResponse>(prop('isSpam')),
          map<FetchCollectionResponse, Nullable<Collection>>(prop('collection')),
          reject(isNil)
        )
      ),
      otherwise(always([] as Collection[]))
    )(wallet)
    for (const collection of collections) {
      const existingCollection = await pipe(
        prop('contract'),
        getCollectionByContract,
        otherwise(always(undefined as Nullable<Collection>))
      )(collection)
      if (isNil(existingCollection)) {
        await pipe(
          addCollection,
          andThen(() => {
            info({ collection }, 'added collection')
          }),
          otherwise((err) => {
            error({ err, collection }, 'could not add collection')
          })
        )(collection)
      }
    }

    const nfts = await pipe(getNftsByWallet, otherwise(always([] as PartialNft[])))(wallet)
    for (const nft of nfts) {
      const existingNft = await pipe(
        getNftByCollectionContract,
        otherwise(always(undefined as Nullable<NftDocument>))
      )(nft)
      if (!isNil(existingNft)) {
        const owner = await pipe(
          getUserByWallet,
          andThen(unlessNil(userDocumentToModel)),
          otherwise(always(undefined as Nullable<User>))
        )(nft.owner)
        if (!eqUser(existingNft.owner, owner)) {
          if (isNil(owner)) {
            await pipe(
              removeNftOwner,
              andThen(() => {
                info({ nft: existingNft }, 'removed nft owner')
              }),
              otherwise((err) => {
                error({ err, nft: existingNft }, 'could not remove nft owner')
              })
            )(existingNft)
          } else {
            await pipe(
              setNftOwner,
              andThen(() => {
                info({ nft: assoc('owner', owner, existingNft) }, 'updated nft owner')
              }),
              otherwise((err) => {
                error({ err, nft: assoc('owner', owner, existingNft) }, 'could not update nft owner')
              })
            )({ nft: existingNft, owner })
          }
        }
      }
    }
  }
}
