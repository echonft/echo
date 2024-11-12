import { changeSnapshotDataPropUpdated } from '@echo/firestore-functions/firestore-triggers/helpers/change-snapshot-data-prop-updated'
import type { FirestoreEventChangeSnapshotDataReturn } from '@echo/firestore-functions/firestore-triggers/helpers/firestore-event-change-snapshot-data'
import { addCollectionTask } from '@echo/firestore-functions/tasks/add-collection-task'
import { enqueueTask } from '@echo/firestore-functions/tasks/helpers/enqueue-task'
import { updateNftOwnerTask } from '@echo/firestore-functions/tasks/update-nft-owner-task'
import { getCollectionByContract } from '@echo/firestore/crud/collection/get-collection-by-contract'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { eqAddress } from '@echo/model/helpers/eq-address'
import type { Collection } from '@echo/model/types/collection'
import { getCollectionsByWallet } from '@echo/nft-scan/services/get-collections-by-wallet'
import { getNftsByWallet } from '@echo/nft-scan/services/get-nfts-by-wallet'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { FetchCollectionResponse } from '@echo/nft-scan/types/response/fetch-collection-response'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, andThen, isNil, map, otherwise, pipe, prop, reject } from 'ramda'

export async function onUserUpdatedTriggerHandler(data: FirestoreEventChangeSnapshotDataReturn<UserDocument>) {
  const { after: wallet, updated } = changeSnapshotDataPropUpdated<UserDocument, 'wallet'>(data, 'wallet', eqAddress)
  if (updated && !isNil(wallet)) {
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
        await pipe(addCollectionTask, andThen(enqueueTask))(collection)
      }
    }

    const nfts = await pipe(getNftsByWallet, otherwise(always([] as PartialNft[])))(wallet)
    for (const nft of nfts) {
      await pipe(updateNftOwnerTask, andThen(enqueueTask))(nft)
    }
  }
}
