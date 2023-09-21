import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'

export function embedValueForTarget(target: FirestoreListingTarget): string {
  return `Any NFT from ${target.collection.name}`
}
