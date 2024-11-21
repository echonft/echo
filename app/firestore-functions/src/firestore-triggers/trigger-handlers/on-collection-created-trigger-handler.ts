import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { getCollectionByContract } from '@echo/firestore/crud/collection/get-collection-by-contract'
import { updateCollection } from '@echo/firestore/crud/collection/update-collection'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { nftByTokenIdComparator } from '@echo/model/helpers/nft/nft-by-token-id-comparator'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { getNftsByCollectionContract } from '@echo/nft-scan/services/get-nfts-by-collection-contract'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { isNonEmptyArray } from '@echo/utils/helpers/is-non-empty-array'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import type { OptionalRecord } from '@echo/utils/types/optional-record'
import { error, info } from 'firebase-functions/logger'
import {
  always,
  andThen,
  assoc,
  dissoc,
  head,
  isNil,
  modify,
  type NonEmptyArray,
  otherwise,
  partial,
  pick,
  pipe,
  prop,
  sort,
  split,
  unless
} from 'ramda'

async function updateCollectionIfNeeded(collection: CollectionDocument, nfts: PartialNft[]) {
  if ((isNil(collection.name) || isNil(collection.pictureUrl)) && isNonEmptyArray(nfts)) {
    await pipe<
      [NonEmptyArray<PartialNft>],
      PartialNft,
      Record<'name', string> & OptionalRecord<'pictureUrl', string>,
      Record<'name', string> & OptionalRecord<'pictureUrl', string>,
      Record<'name', string> & OptionalRecord<'pictureUrl', string>,
      OptionalRecord<'name', string> & OptionalRecord<'pictureUrl', string>,
      Promise<CollectionDocument>,
      Promise<void>
    >(
      head,
      pick(['name', 'pictureUrl']),
      modify<'name', string, string>('name', pipe<[string], NonEmptyArray<string>, string>(split(' #'), head<string>)),
      unless<
        Record<'name', string> & OptionalRecord<'pictureUrl', string>,
        Record<'name', string> & OptionalRecord<'pictureUrl', string>
      >(always(isNil(collection.pictureUrl)), dissoc('pictureUrl')),
      unless<
        Record<'name', string> & OptionalRecord<'pictureUrl', string>,
        OptionalRecord<'name', string> & OptionalRecord<'pictureUrl', string>
      >(always(isNil(collection.name)), dissoc('name')),
      partial(updateCollection, [collection.slug]),
      otherwise((err) => {
        error({ err, collection }, 'could not update collection')
      })
    )(nfts)
  }
}

export async function onCollectionCreatedTriggerHandler(document: Nullable<CollectionDocument>) {
  if (!isNil(document)) {
    info({ collection: document }, 'collection was created')
    const collection = await pipe(
      prop('contract'),
      getCollectionByContract,
      otherwise(always(undefined as Nullable<CollectionDocument>))
    )(document)
    if (!isNil(collection)) {
      const nfts = await pipe(
        prop('contract'),
        getNftsByCollectionContract,
        andThen(sort(nftByTokenIdComparator)),
        otherwise(always([] as PartialNft[]))
      )(collection)
      let successCount = 0
      let failureCount = 0
      await updateCollectionIfNeeded(document, nfts)
      for (const nft of nfts) {
        const owner = await pipe(
          prop('owner'),
          getUserByWallet,
          andThen(unlessNil(userDocumentToModel)),
          otherwise(always(undefined as Nullable<User>))
        )(nft)
        await pipe<
          [PartialNft],
          Omit<PartialNft, 'owner'>,
          Nft,
          Nft,
          Promise<NewDocument<NftDocument>>,
          Promise<void>,
          Promise<void>
        >(
          dissoc('owner'),
          assoc('collection', collection),
          unless<Nft, Nft>(always(isNil(owner)), assoc('owner', owner)),
          addNft,
          andThen(({ id, data }) => {
            successCount++
            info({ collection: document, nft: assoc('id', id, data) }, 'added nft')
          }),
          otherwise((err) => {
            failureCount++
            error({ err, collection: document, nft: assoc('owner', owner, nft) }, 'could not add nft')
          })
        )(nft)
      }
      info({ collection: document, nfts: { added: successCount, failed: failureCount } }, 'added nfts for collection')
    }
  }
}
