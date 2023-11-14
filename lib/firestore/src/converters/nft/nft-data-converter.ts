import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import { modifyWhenHas } from '@echo/firestore/helpers/converters/to-firestore/modify-when-has'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import {
  type FirestoreDataConverter,
  type PartialWithFieldValue,
  QueryDocumentSnapshot
} from 'firebase-admin/firestore'
import { modifyPath, partial, pipe, toLower } from 'ramda'

type NftWithCollection = Nft | (PartialWithFieldValue<Nft> & Record<'collection', Collection>)
function modifyCollection<T extends NftWithCollection>(nft: T) {
  return partial(modifyPath, [['collection', 'contract', 'address'], toLower])(nft) as T
}
type NftWithOwner = Nft | (PartialWithFieldValue<Nft> & Record<'owner', User>)
function modifyOwner<T extends NftWithOwner>(nft: T) {
  return partial(modifyPath, [['owner', 'wallet', 'address'], toLower])(nft) as T
}

export const nftDataConverter: FirestoreDataConverter<Nft> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<Nft>) {
    return pipe<[QueryDocumentSnapshot<Nft>], Nft, Nft, Nft>(
      getSnapshotData<Nft>,
      modifyCollection,
      modifyOwner
    )(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<Nft>) {
    return pipe(
      modifyWhenHas<Nft, 'collection', Collection>(modifyCollection),
      modifyWhenHas<Nft, 'owner', User>(modifyOwner)
    )(modelObject) as Partial<Nft>
  }
}
